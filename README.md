# covid-19-tracker
covid 19 tracker using the production build of react 

## dependencies using:
* @material-ui/core
* react-circular-progressbar
* react-chartjs-2 chart.js
* react-leaflet leaflet
* numeral
## covid 19 api using:
https://disease.sh/docs/ its completely free
## technologies using:
react Hooks(useState,useEffect,useRef)
### note:
- How did I used the circular progressbar in this project?
per default the max value is 100 and min value is 0 then the value you choose what you want from 0 to 100,
Her in this project what I have been used as a max value is new (cases-recovered-deaths) of the worldwide,
then the value is new(cases-recovered-deaths) of the country you selected and of course the min value 0.

- What did I used on the line graph? firstly I used the historical data of the last 120 days and all that from the api,
then the total(cases-recoevered-deaths) of the new day minus the total(cases-recovered-deaths) of the day before to saw how much it increased
lets take an exemple in USA yesterday '10/01/2020' total cases:7277759 and before it '9/30/2020' total cases:7234007 
so if we substract 7277759 with 7234007 the result is 43752 now you seen the new cases, I though you understood :)

I hope you guys enjoy the project and if there any issue or something you dont undethand it I wiil be happy to answer you

from Anouar El Maaroufi
- my facebook: https://www.facebook.com/anouar.elmaaroufi.96
- my instagram: https://www.instagram.com/anouarelmaaroufi10/
