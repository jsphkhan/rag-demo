/** 
 * Simple Ingestion pipeline
*/

import 'dotenv/config';
import { Settings, IngestionPipeline, SentenceSplitter, Document } from 'llamaindex';
import { OpenAIEmbedding } from '@llamaindex/openai';
import { QdrantVectorStore } from '@llamaindex/qdrant';

// import dummy text
import { dummyText } from './docs/bill-joe.mjs';

// set embedding model
Settings.embedModel = new OpenAIEmbedding({
    modelType: 'text-embedding-3-small'
});

// define vector store
const collectionName = 'rag-demo-collection';
const vectorStore = new QdrantVectorStore({
    url: 'http://localhost:6333',
    collectionName,
    embeddingModel: Settings.embedModel
});

async function runIngestionPipeline() {
    const qdClient = vectorStore.client();
    const qdVersion = await qdClient.versionInfo();
    console.log('------  Qdrant DB connected. Version: ', qdVersion.version);


    // get collection names
    const collections = await qdClient.getCollections();
    const collectionNames = collections.collections.map(
    (collection) => collection.name
    );
    console.log(`------  Existing Collections: ${collectionNames.length ? collectionNames.join('\n'): 'None'}`);

    // delete collection if it exists
    // this is to remove duplicates
    if (collectionNames.includes(collectionName)) {
        console.log('------  Deleting collection: ', collectionName);
        await qdClient.deleteCollection(collectionName);
    }

    // define splitter
    const nodeParser = new SentenceSplitter({ chunkSize: 300, chunkOverlap: 50 });

    const document = new Document({
        text: dummyText,
        metadata: {
            source: 'text-file',
            title: 'The Complete Life and Achievements of Dr. Bill Joe: A Scientific Visionary',
            loadedAt: new Date().toISOString(),
            contentLength: dummyText.length,
        },
    });
    const documents = [document];

    console.log('\n\n------  Started embedding pipeline');
    // run pipeline
    // Use ingestion pipeline to process the documents into nodes and add them to the vector store
    const pipeline = new IngestionPipeline({
        transformations: [nodeParser, Settings.embedModel],
        vectorStore
    });

    // run the pipeline
    const nodes = await pipeline.run({ documents });
    console.log('\n------  No of nodes generated: ', nodes.length);
    console.log('------ Example Node: ', nodes[0]);

    console.log('\n------  Embedding pipeline completed\n\n');
}

runIngestionPipeline().catch(console.error);


