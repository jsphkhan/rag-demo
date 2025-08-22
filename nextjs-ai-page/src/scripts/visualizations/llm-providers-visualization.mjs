/** 
 * Launch a web browser and open the link when this script is run
*/

import { exec } from 'child_process';

// Visualization for chunk overlap created by Joseph from inside Claude desktop app
const url = 'https://claude.ai/public/artifacts/f59ab895-eb87-4753-821e-56571ff340be';

// Open the url in the default browser
exec(`open ${url}`);