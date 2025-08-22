/** 
 * Launch a web browser and open the link when this script is run
*/

import { exec } from 'child_process';

// Visualization for chunk overlap created by Joseph from inside Claude desktop app
const url = 'https://claude.ai/public/artifacts/ca08a4bf-8ee1-403d-af54-d6202b59a6e2';

// Open the url in the default browser
exec(`open ${url}`);