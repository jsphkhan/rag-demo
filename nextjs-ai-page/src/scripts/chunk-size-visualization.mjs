/** 
 * Launch a web browser and open the link when this script is run
*/

import { exec } from 'child_process';

// Visualization for chunk overlap created by Joseph from inside Claude desktop app
const url = 'https://claude.ai/public/artifacts/d8f592f3-7502-4b0a-9c1f-d87baf72914a';

// Open the url in the default browser
exec(`open ${url}`);