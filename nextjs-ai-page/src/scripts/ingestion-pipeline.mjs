/** 
 * Simple Ingestion pipeline
*/

import 'dotenv/config';
import { Settings, IngestionPipeline, SentenceSplitter, Document } from 'llamaindex';
import { OpenAIEmbedding } from '@llamaindex/openai';
import { QdrantVectorStore } from '@llamaindex/qdrant';

// import dummy text
import { dummyText } from './docs/bill-joe.mjs';


// Dummy text about an imaginary scientist
// const dummyText = `
// Bill Joe was an extraordinary physicist whose unconventional thinking reshaped the landscape of modern science. Born on March 12, 1975, in the quiet town of Everwood, his fascination with the universe began at the age of seven, when, on September 5, 1982, he constructed a homemade telescope using spare bicycle parts and a cracked magnifying lens. That moment of wonder under the night sky would become the seed from which his career blossomed. By June 14, 1998, at the age of twenty-three, Bill Joe had already published his first peer-reviewed paper, outlining a novel approach to wave-particle duality that intrigued many in the academic community.
// His most notable breakthrough came on February 21, 2002, when he introduced the “Quantum Flux Resonance” theory, a groundbreaking concept that successfully bridged a gap between classical mechanics and quantum field theory. The scientific community was stunned, and this work laid the foundation for numerous advancements in quantum computing. Not content to stop there, in August 2005, Bill Joe unveiled a prototype of a miniature particle accelerator that could fit on a lab bench—an invention that revolutionized accessibility for research institutions with limited budgets. By October 18, 2007, this design had been adopted by over a dozen universities worldwide.
// Though his achievements brought him fame, Bill Joe remained remarkably grounded. On May 4, 2009, he launched a free weekend physics workshop for children in Everwood, firmly believing that curiosity should be nurtured early. He often wore mismatched socks during lectures, claiming they brought him “quantum luck,” a quirk that became part of his legendary persona. On November 12, 2011, he was awarded the Newton-Hawking Medal for Physics in recognition of his contributions to theoretical and experimental science.
// Tragedy struck on April 6, 2015, when Bill Joe’s life was cut short in a mysterious laboratory accident while testing a high-energy resonance chamber. Though details remain classified, it is believed he was working on a device that could manipulate spacetime curvature at a microscopic scale. His passing sent shockwaves through the scientific community, but his influence did not fade. On January 20, 2016, the Bill Joe Institute for Theoretical Physics was founded in his honor, dedicated to pushing the boundaries of human knowledge and making science accessible to all.
// Today, Bill Joe is remembered not only for his genius but also for his humility and passion for education. His groundbreaking theories, inventive spirit, and unshakable belief in the potential of young minds continue to inspire new generations of scientists. Every March 12, on his birthday, physicists and students around the world gather to celebrate “Bill Joe Day,” sharing experiments, discoveries, and a few pairs of mismatched socks in tribute to the man who proved that curiosity, imagination, and persistence can change the world.
// `;

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
    // console.log('------ Example Node: ', nodes[0]);

    console.log('\n------  Embedding pipeline completed\n\n');
}

runIngestionPipeline().catch(console.error);


