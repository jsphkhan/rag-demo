/** 
 * Simple Ingestion pipeline
*/

import 'dotenv/config';
import { Settings, IngestionPipeline, SentenceSplitter } from 'llamaindex';
import { SimpleDirectoryReader } from '@llamaindex/readers/directory';
import { OpenAIEmbedding } from '@llamaindex/openai';
import { QdrantVectorStore } from '@llamaindex/qdrant';

// set embedding model
Settings.embedModel = new OpenAIEmbedding({
    modelType: 'text-embedding-3-small'
});

// define vector store
const collectionName = 'rag-demo-corporate-collection';
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

    // load data from file/folder
    const reader = new SimpleDirectoryReader();
    const documents = await reader.loadData({
        directoryPath: './src/scripts/docs/corporate'
    });
    console.log('------ No. of Documents: ', documents.length);

    // define splitter
    const nodeParser = new SentenceSplitter({ chunkSize: 300, chunkOverlap: 50 });

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
    // console.log('------ Example Node: ', nodes[0]);

    console.log('\n------  Embedding pipeline completed\n\n');
}

runIngestionPipeline().catch(console.error);


