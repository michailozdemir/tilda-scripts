# Tilda Scripts
Scripts for customization websites based on Tilda Publishing platform

This repository is created for showing scripts as a part of portfolio.
Most of them will include only JavaScript language part (mostly jQuery framework usage). 
Doesn't mean I like it, but was easier to do with.


## Discount script
This script allows to create a custom discount based on Tilda promocode option. 
There can be any conditions, like single product amount, multiple product amount, minimal price and etc.

This kind of script works 100%, since it takes the real Tilda promocode logic.
[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-discount.js)


## Currency converter script
Allows to convert prices from desired currency type to another one.
Basically parse the needed bank JSON file and apply everything to Tilda products.

A pretty complicated way of applying was used. Such things as setTimout should be avoided, but since we're implementing it to a platform which has custom functions and their applying time, I had to do this kind of a dirty hack.

[Link to script file](https://github.com/michailozdemir/tilda-scripts/blob/master/tilda-currency-converter.js)

