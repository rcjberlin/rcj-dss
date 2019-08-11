# RCJ Rescue Line - Digital Scoring Sheet
The aim of this project is to replace the paper scoring sheets at RCJ Rescue Line with digital ones on small mobile devices (like smartphones).

It's planned to use this software at RCJ Berlin (March/2020) if the project is finished until then.

## Guide for Referees/Users
tbd

## Documentation
This project must meet certain demands so that it can be used during competition:
* all requirements deduced from the rules must be implemented and work correctly
* functionality has to be as good as with paper scoring sheets (if not better)
* referees should use their own smartphones &rarr; many different devices should be supported (various operating systems, browsers, ...)
* requirements for user interface:
  * should work for various screen sizes (size, aspect ratio)
  * UI elements have to be big enough so that every text can be read and every button clicked easily
  * procedure may be divided in multiple steps, but for each step all necessary UI elements should fit on the screen (no scrolling/swiping)
  * resistant against incorrect handling (closing app / page reload, clicking wrong button, ...)
* energy consumption of devices should not be increased significantly
* information for all runs have to be collected from multiple devices to create standings/rankings
* the internet connection at competition could be slow &rarr; traffic should be reduced to a minimum
* problems which might occur but which must not affect the competition
  * short internet outages
  * devices/systems could crash/freeze

What's planned?
* web page (optimized for smartphones)
* Single-Page-Application
* storing all data locally and send everything to an evaluation system where all runs are brought together
* UI consisting of 8 different parts:
  1. Referee login; specify competition (Line / Line Entry), field, round
  2. Select teamname (from list of all teams or exceptional by text input); select kind of evacuation point (low/high) in Rescue Line
  3. Measure time for calibration and setting checkpoints
  4. Main UI, enter all information during scoring run: start/pause time; section completed, Lack of Progess, skipped section; award points for gaps, obstacles, speed bumps, ramps and intersections; see current status (time, section, try, number of scoring elements, ...); reached last checkpoint; undo steps
  5. Enter number of tiles per section; enter number of rescued victims; left evacuation zone successfully
  6. Review everything together with team captain and correct things if needed; text input for complaints; signature of team captain (perhaps combined with checksum to prevent manipulation)
  7. Send whole sheet to central evaluation system; get confirmation in case of successful transmission
  8. View all locally saved data (including status whether transmitted successfully or not), possibility to send it again or to export data (&rarr; other medium for transmission can be used)
* navigation between these parts (mostly only back/next)
* step 1 will be used when competition starts / referee switches field / next round starts
* normally you will go through step 2 till 7 sequentially for each team
* step 8 will only be used if data transmission fails