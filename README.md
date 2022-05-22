# TAPS LITE

**TAPS** - A tool for Bakers!   NEW VERSION! (May 2022)

TAPS LITE is a Tezos dApp that enables Tezos Bakers to easily distribute rewards with a web-page like interface, through Beacons.
TAPS will fetch your delegators list and display it on screen with tools to configure, edit, enable and disable payments.
It will also let you SIMULATE how rewards distribution are going to be, before actually sending rewards transaction to the wallet.
TAPS does not send transactions directly to Tezos blockchain. Rather, it uses your preferred Beacon wallet to confirm and sign
your batch transaction, which represents additional safety.

## Getting started

To use TAPS LITE you need to be a Tezos Baker and have a Beacon enabled Tezos wallet with enough tez to fund your cycle rewards distribution. 

## TAPS Installation

There is no need to install anything! TAPS LITE is a Tezos dApp ready for use online.
Just access https://tztaps.io and click on CONNECT button to connect to your preferred wallet.

## Disclaimer

This software is BETA. It is experimental and still under development and testing.

## Features

 - Displays a list of delegators that should be paid and how much.
 - Shows each delegator’s share, reward value before fee, value after fee, calculated in real time.
 - Allows user to toggle individually which delegators should be paid or not.
 - Lets user have multiple different fee percentages for each delegator.
 - Allows user to specify a minimum delegated amount for the delegator to be paid.
 - Allows user to set a minimum transfer amount below which payment won’t happen.
 - Offers multiple RPC providers to be chosen in a selection box.
 - Automatically detects if an RPC is offline and uses an alternative one.
 - Simulates rewards distribution as a preview in a PDF file.
 - Stores user configuration in the browser – no data ever leaves the dApp.
 - Allows reset previously saved configuration, returning to factory default state.
 - Distributes rewards through building a batch transaction that is then sent to user’s preferred wallet through Beacon.
 - (NEW!) Now mobile friendly.
 - (NEW!) On "DELEGATORS" menu option, now it's possible to specify for which cycle to distribute rewards to.
 - (NEW!) CSV Batch feature, allows to import a standard "Comma Separated Values" text file for building a manual Tezos batch operation.
 - (NEW!) Bond Pool rewards distribution! Just like on TAPS classic, now bakers can handle Bond Pool in TAPS LITE.
 - (NEW!) Governance, voting! A tool to facilitate Tezos Governance proposals voting for bakers.

## Credits

- TAPS is a [Tezos.Rio](https://tezos.rio) team open-source product.

## License

**TAPS** is available under the **MIT License**.

[project-issues]: https://github.com/TezosRio/TAPS/issues
[project-license]: LICENSE.md
