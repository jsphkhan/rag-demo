/** 
 * Launch a web browser and open the link when this script is run
*/

import { exec } from 'child_process';

// Visualization for chunk overlap created by Joseph from inside Claude desktop app
const url = 'https://claude.ai/public/artifacts/c2941e63-195e-458b-b91a-bbf310263409';

// Open the url in the default browser
exec(`open ${url}`);