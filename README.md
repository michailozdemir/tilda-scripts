# Tilda Scripts
Scripts for customization websites based on Tilda Publishing platform

This repository is created for showing scripts as a part of portfolio.
Most of them will include only JavaScript language part (mostly jQuery framework usage). 
Doesn't mean I like it, but was easier to do with, since Tilda Publishing supports it.


## Discount script
This script allows to create a custom discount based on Tilda promocode option. 
There can be any conditions, like single product amount, multiple product amount, minimal price and etc.

This kind of script works 100%, since it takes the real Tilda promocode logic.  

[Link to page](https://javascriptislife.tilda.ws/)  
[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-discount.js)


## Currency converter script
Allows to convert prices from desired currency type to another one.
Basically parse the needed bank JSON file and apply everything to Tilda products.

A pretty complicated way of applying was used. Such things as setTimout should be avoided, but since we're implementing it to a platform which has custom functions and their applying time, I had to do this kind of a dirty hack.  


[Link to page](https://javascriptislife.tilda.ws/currency-convert)
[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-currency-converter.js)


## Taxi form script
The task was create a form for taxi service. It takes user real location (in case it's allowed). Passes it to certain inputs and calculates the price for a ride based on pre-defined values in JavaScript object. Once location can't be found, you can choose the city from the dropdown and after that pass the exact address to next input (exact address was needed just for the service, didn't take it's part in a calculation). There are also some kind of field validators (button for ordering is not allowed to click before all fields are filled). Used a dirty mix of JavaScript with jQuery actually.  

[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-taxi-form.js)  
[Link to page](https://javascriptislife.tilda.ws/taxi-form)


## Tilda Tinder (so called)
This kind of customization represent Tinder look to default product cards on Tilda Publishing platform. The user can like and dislike cards with products (basically travel destinations). Liked cards go to cart, disliked cards just fading out and stay in hidden state. Both cards are stored in Local Storage and once you click 'Сбросить все' it resets the cards back to where they were, clears storage and cart. Also had to customize buttons for product item (make them look similar to like & dislike buttons).

[Link to page](https://javascriptislife.tilda.ws/tilda-tinder)  
[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-tinder.js)

## Pythagoras square (calculator)
Created a calculator called Pythagoras square, which is used for numerology. It takes digits of your birth date and takes it in different combinations. After that gives you some result with numbers, which you can read about after and know what kind of person are you (whew).

[Link to page](https://javascriptislife.tilda.ws/pythagoras-square)  
[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-pythagoras-square.js)

