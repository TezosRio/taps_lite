<template>
<div id="app">
<div class="container" v-if="isMobile === false">
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" v-show="isConnected === true">
            <div class="sidebar-header">
                <figure>
                    <img :src="images.logo" class="img-logo-taps" alt="TAPS" width="150">
                </figure>
            </div>

            <ul class="list-unstyled components">
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('dashboard')">DASHBOARD</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('settings')">SETTINGS</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('delegators')">DELEGATORS</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('csvbatch')">CSV BATCH</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('bondpool')">BOND POOL</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('governance')">GOVERNANCE</a>
                </li>
                <li>
                    <a href="#sidebar" v-on:click="setMenuOption('reset')">RESET</a>
                </li>
            </ul>

            <div id="idDivDistributeButton"  style="position:relative;margin-left:25px;margin-top:35px;;width:130px;height:100px;border:none;p">
                <button type="button" id="idBtnSend" class="botao-taps" style="width:130px !important;" v-on:click="createBatchTransaction">{{distributeButtonCaption}}</button>
            </div>

        </nav>

        <!-- Page Content  -->
        <div id="content" style="margin-left:-15px;">
            <section class="width:700px;box-content-rewards" style="margin-left:15px;display:block;" id="topBar" v-show="isConnected === true">
                <div style="position:relative;left:-25px;top:-25px;background-color:grey;width:100%;">
                   <div style="display:inline-block;width:58%;text-align:right;margin-top:-10px;"><span class="balance">Balance: {{addressBalance ? addressBalance : ''}} {{addressBalance ? tezSymbol : ''}}</span></div>
                   <div style="display:inline-block;width:27%;text-align:right;">
                   <span class="roundedCorners">             
                        Wallet: {{connectedWalletAddress ? connectedWalletAddress.substr(0, 5) + '...' + connectedWalletAddress.substr(connectedWalletAddress.length - 5, connectedWalletAddress.length) : ''}}  
                    </span>
                   </div>
                   <div style="display:inline-block;width:6%;text-align: right;">
                        <figure>
                            <img :src="images.settings" class="img-logo-taps filter-white clickable" alt="settings" v-on:click="setMenuOption('settings')">
                        </figure>
                    </div>
                    <div style="display:inline-block;width:6%;text-align: right;">
                        <figure>
                            <img :src="images.logout" class="img-logo-taps filter-white clickable" alt="logout" v-on:click="disconnect">
                        </figure>
                   </div>
                   <div style="display:inline-block;width:3%;"><span>&nbsp;</span></div>
                </div>

            </section>

            <section class="box-content-rewards" style="margin-left:-100px;" id="welcome" v-show="menuop === 'welcome' && isConnected === false">
                <figure>
                    <img :src="images.logo" class="img-logo-taps" alt="TAPS" width="150">
                </figure>

                <div style="width:300px;height:100px;border:none;position:absolute;right:-300px;top:30px;">
                    <button type="button" id="idBtnConnect" class="botao-taps" v-on:click="connectWallet">CONNECT</button>
                </div>

                <!-- div style="z-index:-1;width:1000px;height:150px;border:none;position:absolute;right:-100px;bottom:270px;">
                    <figure>
                        <img :src="images.aqueduct" class="img-logo-taps" alt="Aqueduct" width="1000">
                    </figure>
                </div -->

                <div style="margin-left:80px;background-color:transparent;">
                    <h2 style="color:black;font-family: Verdana, sans-serif;font-weight: lighter;">The Easiest Way to Distribute</h2>
                    <h2 style="color:black;font-family: Verdana, sans-serif;font-weight: lighter;">Tezos Baking Rewards</h2>
                    <br>
                    <div id="form-todo form-group" style="width:850px;">
                        <div style="margin-top:30px;margin-left:0px;text-align:justify;text-justify: inter-word;width:600px;color:grey;font-family: Verdana, sans-serif;font-size:20px;">
                            Manage your cycle payments effortlessly<br>
                            Distribute rewards at the touch of a button!
                            <br><br> 
                        </div>
                    </div>
                </div>
            </section>

            <section class="box-content-rewards" id="dashboard" v-show="(menuop === 'dashboard')">
                <h2>Dashboard</h2>
                <h4 style="padding-bottom:10px;margin-top:-10px;margin-left:2px;">Baker properties</h4>
                <div id="form-todo form-group" style="width:955px;">
                    <div v-show="this.bakerInfoLogo" style="position:absolute;margin-top:-90px;width:950px;height:100px;text-align:right;padding-right:130px;border:none;">
                        <div id="logoBaker">
                            {{this.bakerInfoName}} <img v-bind:src="this.bakerInfoLogo" width="85" height="85" style="border:none;text-aling:left;vertical-align:middle;">
                        </div>
                    </div>
                    <table class="table table-taps-alt" style="width:750px;line-height:15px;margin-left:80px;margin-top:0px;">
                        <tr>
                            <td class="dashboard-title">Baking Address</td>
                            <td align="left">{{configuredBakerId ? configuredBakerId : 'Not Configured'}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Rewards Distribution Status</td>
                            <td>
                                <toggle-button @change="toggleStatus()" :speed="200" :width="50" :value="tapsStatus" :sync="true" color="#c8b08b" :labels="{checked: 'On', unchecked: 'Off'}" :checked="tapsStatus" v-model="tapsStatus" style="margin-left:0px;margin-top:-6px;height:10px;"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">RPC provider status</td>
                            <td>{{isRpcProviderOnline ? 'Online' : 'Offline, using alternative'}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Configured Baking Fee</td>
                            <td>{{configuredDelegatorFee ? configuredDelegatorFee + '%' : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Minimum Delegated Value for Payout</td>
                            <td>{{configuredMinAcceptedDelegatedAmount ? configuredMinAcceptedDelegatedAmount + tezSymbol : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Minimum Accepted Amount Transfered</td>
                            <td>{{configuredMinTransactionAmount ? configuredMinTransactionAmount + tezSymbol : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Current Delegators Total</td>
                            <td>{{totalDelegators ? totalDelegators : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="dashboard-title">Current Cycle / Rewards Pending Cycle</td>
                            <td>{{ currentCycle > 0 ? currentCycle +  " / " + rewardsPendingCycle : computedUnavailable  }}</td>
                        </tr>
                    </table>
                </div>
            </section>

            <section id="settings" class="box-content-rewards" v-show="menuop === 'settings'">
                <h2>Settings</h2>
                <div id="form-todo form-group" style="width:955px;line-height:15px;padding-left:70px;margin-top:30px;">
                    <p>
                        <label>
                            <span class="text-input-taps">Baking Address
                                <span><span class="errorRequired" style="margin-left:10px;"><span v-if="msg.configuredBakerId">{{msg.configuredBakerId}}</span></span></span>
                            </span>
                            <input id="idBakingAddress" name="bakingAddress" type="text" size="30" maxlength="36" v-model="configuredBakerId" @keypress="isAlphaNumeric($event)" class="form-control input-taps" placeholder="Enter your Tezos baking address" style="width:469px;text-align:center;">
                        </label>
                    </p>
                    <p>
                        <label>
                            <span class="text-input-taps">Tezos RPC Provider
                                <span><span class="errorRequired" style="margin-left:10px;"><span v-if="msg.configuredRpcProvider">{{msg.configuredRpcProvider}}</span></span></span>
                            </span>
                            <select id="idProvider" name="provider" v-model="configuredRpcProvider" maxlength="70" class="form-control input-taps" placeholder="Enter a Tezos RPC gateway url" style="width:469px;text-align:center;">
                                <option disabled value="">Choose a provider...</option>
                                <option v-for="option in providers" :value="option.value" :key="option.value">{{ option.text }}</option>
                            </select>
                        </label>
                    </p>
                    <p>
                         <label>
                            <span class="text-input-taps">Baker Fee (%)</span>
                            <input id="idFee" name="fee" type="text" size="5" maxlength="5" v-model="configuredDelegatorFee" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Rewards fee" style="width:122px;text-align:center;">
                        </label>
                       <label>
                            <span class="text-input-taps">&nbsp;</span>
                        </label>
                        <label>
                            <span class="text-input-taps">Min Delegation ({{tezSymbol}})</span>
                            <input id="idMinimumAcceptedDelegatedAmount" name="minimumAcceptedDelegatedAmount" type="text" size="5" maxlength="5" v-model="configuredMinAcceptedDelegatedAmount" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Min for payout" style="width:163px;text-align:center;">
                        </label>
                        <label>
                            <span class="text-input-taps">&nbsp;</span>
                        </label>
                        <label>
                            <span class="text-input-taps">Min TX Value ({{tezSymbol}})</span>
                            <input id="idMinTransactionAmount" name="transactionAmount" type="text" size="5" maxlength="10" v-model="configuredMinTransactionAmount" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Min tx amount" style="width:145px;text-align:center;">
                        </label>
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>
                    <div style="margin-left:5px;margin-top:10px;width:450px;height:50px;text-align:center;border:none;">
                        <div>
                            <button id="idBtnReset" type6="button" @click="resetSettings" style="width:95px;height:40px;display:inline;margin:5px;">DEFAULTS</button>
                            <button id="idBtnFetch" type="button" @click="fetchBakerDelegators(true)" style="width:75px;height:40px;display:inline;margin:10px;">SAVE</button>
                            <div style="position:absolute;width:200px;height:0px;top:225px;left:405px;"> 
                                <tile v-show="isLoading"></tile>
                            </div>
                        </div>
                    </div>
                    <div v-show="this.bakerInfoLogo" style="position:absolute;padding-top:70px;margin-left:470px;margin-top:-380px;width:350px;height:350px;text-align:center;vertical-align:middle;">
                        <div style="border:2px solid #c8b08b;width:180px;height:200px;display:block;margin-left:auto;margin-right:auto;padding-top:20px;">
                            <div id="logoBaker">
                                <img v-bind:src="this.bakerInfoLogo">
                            </div>
                            <div id="nameBaker">
                                {{this.bakerInfoName}}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="delegators" class="box-content-rewards" v-show="menuop === 'delegators'">
                <h2>Delegators</h2>
                <div v-show="menuop === 'delegators' && (delegators.length == 0 || configuredBakerId.length == 0)">
                    <h4>Delegators List</h4>
                    <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                        <br>
                        Please, configure your baker properties on SETTINGS to start.
                    </div>
                </div>
                <div v-show="menuop === 'delegators' && delegators.length > 0 && configuredBakerId.length > 0">
                    <h4>
                        Delegators - Payout Cycle:
                        <input id="idCycleToPay" name="cycleToPay" type="text" align="center" size="3"  maxlength="10" v-model="payoutCycle" @keypress="isNumber($event)" value="payoutCycle" @change="fetchBakerDelegators(false)" placeholder="" style="text-align: center;font-size: 14px;color:#c5a87c;">&nbsp;
                        <button type="button" id="idBtnOkPayout" class="botao-taps" style="padding-top:-10px;width:60px !important;">OK</button>
                    </h4>

                    <!-- Bond Poolers -->
                    <div id="form-todo form-group" style="width:955px;" v-show="doBondPoolPayments == true && bondpoolers.length > 0">
                        <br>
                        <table class="table table-taps-alt">
                            <thead style="border:1px solid #89CFF0;color:white;background-color:#89CFF0;">
                                <tr>
                                    <th style="text-align:center;" scope="col">&nbsp;</th>
                                    <th style="text-align:left;" scope="col">Bondpooler</th>
                                    <th style="text-align:center;" scope="col">Balance</th>
                                    <th style="text-align:center;" scope="col">Share</th>
                                    <th style="text-align:center;" scope="col">Earnings</th>
                                    <th style="text-align:center;" scope="col">Fee</th>
                                    <th style="text-align:center;" scope="col">Payout</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style="font-size: 0.9em;" align="center"></td>
                                    <td style="font-size: 0.9em;" align="left">{{this.bakerInfoName}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{(this.bakerBalance - computedBondPoolersTotalBalance) | formatTez}}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{computedBakerPoolShare | formatPercentage}}%</td>
                                    <td style="font-size: 0.9em;" align="center">{{((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100 | formatTez}} {{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center"></td>
                                    <td style="font-size: 0.9em;" align="center"></td>
                                </tr>

                                <tr v-for="(bondpooler,  index) in bondpoolers" :key="index">
                                    <td style="font-size: 0.9em;" align="center">{{index+1}}</td>
                                    <td style="font-size: 0.9em;" align="left">{{bondpooler.memberAddress}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{bondpooler.memberAmount | formatTez}}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{bondpooler.memberShare | formatPercentage}}%</td>
                                    <td style="font-size: 0.9em;" align="center">{{((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100 | formatTez}} {{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{bondpooler.memberFee}}%</td>
                                    <td style="font-size: 0.9em;" align="center">
                                        {{(((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100) - (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100) * (bondpooler.memberFee/100) | formatTez }}{{tezSymbol}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="font-size: 0.9em;" align="center">Totals</td>
                                    <td style="font-size: 0.9em;" align="left"></td>
                                    <td style="font-size: 0.9em;" align="center">{{computedPoolTotalBalance| formatTez}}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{(computedBakerPoolShare + computedPoolTotalShare) | formatPercentage}}%</td>
                                    <td style="font-size: 0.9em;" align="center">{{computedPoolTotalEarnings + (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100) | formatTez}}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center"></td>
                                    <td style="font-size: 0.9em;" align="center">{{computedPoolActualEarnings + (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100) | formatTez}}{{tezSymbol}}</td>
                                </tr>

                            </tbody>
                        </table>
                        <br><br>
                    </div>
                    <!-- End of Bond Poolers -->

                    <div id="form-todo form-group" style="width:955px;">
                        <table class="table table-taps-alt">
                            <thead class="head-table-taps">
                                <tr>
                                    <th style="text-align:center;" scope="col">#</th>
                                    <th style="text-align:left;" scope="col">Delegator</th>
                                    <th style="text-align:center;" scope="col">Balance</th>
                                    <th style="text-align:center;" scope="col">Share</th>
                                    <th style="text-align:center;" scope="col">Rewards</th>
                                    <th style="text-align:center;" scope="col">Fee</th>
                                    <th style="text-align:center;" scope="col">Actual</th>
                                    <th style="text-align:center;" scope="col">Pay?</th>                                
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(delegator,  index) in delegators" :key="index">
                                    <td style="font-size: 0.9em;" align="center">{{index+1}}</td>
                                    <td style="font-size: 0.9em;" align="left">{{delegator.address}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{(delegator.balance / ONE_MILLION) | formatTez}}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">{{((delegator.balance / stakingBalance)*100) | formatPercentage}}%</td>
                                    <td style="font-size: 0.9em;" align="center">{{((totalRewards / ONE_MILLION) * (delegator.balance / stakingBalance)) | formatTez }}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;width:70px;display: inline-block;white-space: nowrap;" align="center">
                                        <input id="idDelegatorFee" name="delegatorFee" type="text" align="center" size="3"  maxlength="3" v-model="feeArray[index].fee" @keypress="isNumber($event)" value="feeArray[index].fee" @change="saveSettings" placeholder="" style="text-align: center;font-size: 0.9em;">&nbsp;%
                                    </td>
                                    <td style="font-size: 0.9em;" align="center">
                                        {{(((totalRewards / ONE_MILLION) * (delegator.balance / stakingBalance))) - (((totalRewards / ONE_MILLION) * (delegator.balance / stakingBalance) * (feeArray[index].fee/100))) | formatTez }}{{tezSymbol}}
                                    </td>
                                    <td align="center">
                                        <toggle-button
                                        :value="payoutArray[index].value"
                                        :sync="true"
                                        :labels="true"
                                        :disabled="false"
                                        color="#c8b08b"
                                        :key="index"
                                        @change="toggle(index)" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br><br>
                </div>

                <!-- Totals -->
                <div id="form-todo form-group" style="width:955px;" v-show="(delegators.length > 0 && configuredBakerId.length > 0)">
                    <table class="table table-taps-alt">
                        <thead>
                            <tr>
                                <th style="text-align:center;" scope="col">Total</th>
                                <th style="text-align:center;" scope="col"></th>
                                <th style="text-align:center;" scope="col"></th>
                                <th style="text-align:center;" scope="col"></th>
                                <th style="text-align:center;" scope="col">Rewards</th>
                                <th style="text-align:center;" scope="col"></th>
                                <th style="text-align:right;" scope="col">Actual</th>
                                <th style="text-align:center;" scope="col"></th>                                
                            </tr>
                        </thead>

                        <tbody>
                            <td style="font-size: 0.9em;" align="center">{{delegators.length}}</td>
                            <td style="font-size: 0.9em;" align="left">&nbsp;</td>
                            <td style="font-size: 0.9em;" align="center">&nbsp;</td>
                            <td style="font-size: 0.9em;" align="center"></td>
                            <td style="font-size: 0.9em;" align="center">{{computedTotalDelegatorsRewards | formatTez }}{{tezSymbol}}</td>
                            <td style="font-size: 0.9em;" align="center">&nbsp;</td>
                            <td style="font-size: 0.9em;" align="right">{{computedTotalDelegatorsActual | formatTez }}{{tezSymbol}}</td>
                            <td align="center">&nbsp;</td>
                        </tbody>
                    </table>
                </div>
                <!-- Totals -->
            </section>

            <section id="csvbatch" class="box-content-rewards" v-show="menuop === 'csvbatch'">
                <h2>CSV Batch</h2>
                <div v-show="menuop === 'csvbatch' && configuredBakerId.length == 0">
                    <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                        <br>
                        Please, configure your baker properties on SETTINGS to start.
                    </div>
                </div>
                <div v-show="menuop === 'csvbatch' && configuredBakerId.length > 0">
                    <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                        Import a standard CSV file from a spreadsheet to use as source for a manual batch operation.<br>
                        <br>
                        Requirements:<br>
                        <br>
                        <ul>
                            <li>
                                Delimiter character must be a comma (",").<br>
                            </li>
                            <li>
                                File must contain only two columns, with no headers.<br>
                            </li>
                            <li>
                                First column is for destination adresses (text), one per row.<br>
                            </li>
                            <li>
                                Second column is for amounts in militez (1000000 = 1 tez), one per row<br>
                            </li>
                        </ul> 
                        CSV File format sample:<br>
                        <table cellspacing="0" cellpadding="2" style="margin-left:25px;border:1px solid black;">
                            <tr>
                                <td>tz1S37hEZnNrAXfzuRYSjG9Qxq8VrwpWaukB,1000000</td>
                            </tr>
                            <tr>
                                <td>tz1ZvZLYPYoH2Xm4tX1xprqLZZnXc1kYM4ji,3000000</td>
                            </tr>
                            <tr>   
                                <td>KT1XFqZeHDPw4TmkjgCN5knsYvZYGj2r5c3F,2500000</td>
                            </tr>
                        </table>
                        <br>
                        Choose your file then check the data before sending it to your Beacon wallet.
                        <br>
                        <div style="border-style:none;height:auto;">
                            <input type="file" ref="doc" @change="readFile()" accept=".csv,.CSV,.txt,.TXT" />
                            
                            <br><br><br>

                            <table class="table table-taps-alt" v-show="parsedCsv != null">
                                <thead class="head-table-taps">
                                   <tr>
                                      <th style="text-align:center;" scope="col"></th>
                                      <th style="text-align:left;" scope="col">Destination Address</th>
                                      <th style="text-align:center;" scope="col">Amount</th>
                                   </tr>
                                 </thead>

                                <tbody>
                                    <tr v-for="(row,  index) in parsedCsv" :key="index">
                                       <td style="font-size: 0.9em;" align="center">{{index + 1}}</td>
                                       <td style="font-size: 0.9em;" align="left">{{row[0]}}</td>
                                       <td style="font-size: 0.9em;" align="center">{{row[1] / ONE_MILLION}}&nbsp;{{tezSymbol}}</td> 
                                    </tr>

                                    <tr>
                                        <td align="left"><b>Total</b></td>
                                        <td align="left"></td>
                                        <td align="center"><b>{{computedTotalSumCsv / ONE_MILLION}}&nbsp;{{tezSymbol}}</b></td>
                                    </tr>

                                </tbody>

                             </table>

                            <div v-show="parsedCsv != null">
                                <button v-on:click="createCustomCsvBatchTransaction()" id="idBtnSendBatch" type="button" style="width:125px;height:40px;display:inline;margin-left:0px;">SEND BATCH</button>
                                <br><br><br><br><br>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section id="bondpool" class="box-content-rewards" v-show="menuop === 'bondpool'">
                <h2>Bond Pool</h2>
                <div v-show="menuop === 'bondpool' && configuredBakerId.length == 0">
                    <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                        <br>
                        Please, configure your baker properties on SETTINGS to start.
                    </div>
                </div>
                <div v-show="menuop === 'bondpool' && configuredBakerId.length > 0">
                    <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                        Configure your bond pool<br>
                        <br>
                        <input type="checkbox" id="idDoBondPoolPayments" v-model="doBondPoolPayments" value="doBondPoolPayments" @click="toggleBondPoolPayments()" />&nbsp;&nbsp;&nbsp;Do bond pool payments on every distribution
                        <br>
                        <br>
                        Distribute cycle rewards income remaining funds (after delegators have been paid)<br>
                        among configured private participants of the baker.<br>
                        <br>
                        Add/update/remove members
                        <br><br>

                        <div style="width:100%;height:auto;margin-left:0px;margin-top:0px;border:none;">
                            <input type="text" id="idAddress" v-model="memberAddress" placeholder="Address" style="padding-right:5px;display:inline-block;text-align:left;width:360px;" class="form-control input-taps">
                            <div style="width:10px;display:inline-block;">&nbsp;</div>
                            <input type="text" id="idAmount" v-model="memberAmount" @keypress="isNumber($event)" maxlength="20" placeholder="Amount (XTZ)" style="padding:5px;display:inline-block;text-align:left;width:120px;" class="form-control input-taps">
                            <div style="width:10px;display:inline-block;">&nbsp;</div>
                            <input type="text" id="idFee" v-model="memberFee" @keypress="isNumber($event)" maxlength="3" placeholder="Fee (%)" size="5" style="padding:5px;display:inline-block;text-align:left;width:80px;" class="form-control input-taps">
                            <div style="width:10px;display:inline-block;">&nbsp;</div>
                            <input type="text" id="idName" v-model="memberName" placeholder="Member name" style="padding:5px;display:inline-block;text-align:left;width:170px;" class="form-control input-taps">
                            <div style="width:10px;display:inline-block;">&nbsp;</div>
                            <input type="button" @click="addBondPoolMember()" class="add-row" value="ADD" style="padding:5px;display:inline-block;text-align:left;width:50px;">
                        </div>

                        <br>

                        <table class="table table-taps-fees" id="id_members" style="width:96%;">
                                <thead class="head-table-taps">
                                <tr>
                                    <th style="text-align:left;" scope="col">Address</th>
                                    <th style="text-align:center;" scope="col">Amount (XTZ)</th>
                                    <th style="text-align:left;" scope="col">Fee (%)</th>
                                    <th style="text-align:left;" scope="col">Name</th>
                                    <th style="text-align:center;" scope="col"></th>
                                    <th style="text-align:center;" scope="col"></th>
                                    <th style="text-align:center;" scope="col"></th>
                                    <th style="text-align:center;" scope="col"></th>
                                </tr>
                            </thead>

                            <tbody class="members_class" id="idMembers">
                                <tr style="line-height:80px;font-size:18px;" v-show="bondpoolers != null && bondpoolers.length == 0">
                                    <td colspan="6" id="id_nomembers">
                                        <center>There are no bond pool members registered yet.</center>
                                    </td>
                                </tr>

                                <tr v-for="(bondpooler,  index) in bondpoolers" :key="index">
                                    <td align="left">
                                        <input name="memberAddress" id="idMemberAddress" v-model="bondpooler.memberAddress" type="text" readonly style="border:none;background:none;width:340px;">
                                    </td>

                                    <td align="center" >
                                        <input name="memberAmount" id="idMemberAmount" size="5" maxlength="20" v-model="bondpooler.memberAmount" v-on:focus="processMemberAmount($event, index)" ref="myMemberAmountInput" @keypress="isNumber($event)" @keyup="isValidAmount($event, bondpooler.memberAmount, index)" type="text" style="text-align:right;width:110px;" class="name_amount">
                                    </td>

                                    <td align="center" >
                                        <input name="memberFee" id="idMemberFee" size="5" maxlength="3" v-model="bondpooler.memberFee" @keypress="isNumber($event)" @keyup="isValidPercentage($event, bondpooler.memberFee, index)" type="text" style="text-align:right;width:50px;">
                                    </td>

                                    <td align="center">
                                        <input name="memberName" id="idMemberName" v-model="bondpooler.memberName" @keyup="isValidName($event, bondpooler.memberName)" type="text" style="width:100px;">
                                    </td>

                                    <td align="center">
                                        <img :src="images.delete" style="cursor:pointer;margin-top:-3px;margin-left:10px;" width="30" heigh="30" @click="removeBondPoolMember(index)" />
                                    </td>

                                    <td align="center">
                                        &nbsp;
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <br><br>
                    </div>
                </div>
            </section>

            <section class="box-content-rewards" id="governance" v-show="(menuop === 'governance')">
                    <div v-show="menuop === 'governance'">
                    <h2>Governance</h2>
                    <h4 style="padding-bottom:10px;margin-top:-10px;margin-left:2px;">Tezos Proposals Voting</h4>
                    <div v-show="menuop === 'governance' && configuredBakerId.length == 0">
                        <div id="form-todo form-group" style="width:955px;padding-left:20px;">
                            <br>
                            Please, configure your baker properties on SETTINGS to start.
                        </div>
                    </div>
                    <div v-show="menuop === 'governance' && configuredBakerId.length > 0" id="form-todo form-group" style="width:955px;height:auto;padding-top:0px;padding-left:10px;padding-bottom:30px;">
                        <div v-for="(proposal,  index) in proposals" :key="index" v-show="true">
                            <table style="border:1px solid black;width:700px;padding:5px;">
                                <thead>
                                    <tr style="background-color:#c5a87c;color:white;">
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Name</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Hash</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td style="border:1px solid black;font-size: 0.9em;width:100px;padding:10px;" align="center">{{capitalizeFirstLetter(proposal.alias)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:400px;padding:10px;" align="center">{{proposal.hash}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:100px;padding:10px;" align="center">{{capitalizeFirstLetter(proposal.status)}}</td> 
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <table v-show="proposal.status === 'active'" style="border: 1px solid black;width:700px;padding:5px;">
                                <thead>
                                    <tr style="background-color:#c5a87c;color:white;">
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Period</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Start Time</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">End Time</th>
                                    </tr>
                                    </thead>

                                <tbody>
                                    <tr>
                                        <td style="border:1px solid black;font-size: 0.9em;width:30%;padding:10px;" align="center">{{capitalizeFirstLetter(currentProposalKind)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:40%;padding:10px;" align="center">{{dateBackFrom(currentProposalStartTime)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:30%;padding:10px;" align="center">{{dateForwardTo(currentProposalEndTime)}}</td> 
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <div v-show="proposal.status === 'active'" style="position:relative;height:100px;;margin-top:5px;text-align:center;width:600px;">
                                <div style="width:auto;display:inline-block;padding:20px;">Cast your vote:</div>
                                <img :src="images.yay" class="clickable" alt="Yay" v-on:click="vote(configuredBakerId, proposal.hash, 'yay', proposal.kind, index)" style="padding-right:10px;">
                                <img :src="images.nay" class="clickable" alt="Nay" v-on:click="vote(configuredBakerId, proposal.hash, 'nay', proposal.kind, index)" style="padding-right:10px;" v-show="proposal.kind != 'proposal'">
                                <img :src="images.pass" class="clickable" alt="Pass" v-on:click="vote(configuredBakerId, proposal.hash, 'pass', proposal.kind, index)" style="padding-right:10px;" v-show="proposal.kind != 'proposal'">
                            </div>
                            <div v-show="proposals[index].myVoteCommand.length > 0">
                                <div style="position:relative;width:700px;margin-top:-20px;margin-bottom:50px;border:1px solid black;padding:10px;display:inline-block;font-size:14px;">
                                    <textarea type="text" ref="myVoteInput" v-model="proposals[index].myVoteCommand" style="width:550px;border:none;height:46px;resize:none;" readonly />
                                    <button 
                                        type="button"
                                        v-clipboard:copy="proposals[index].myVoteCommand"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        style="position:absolute;left:428px;top:39px;width:95px;height:40px;display:inline-block;margin-left:160px;margin-top:-25px;">
                                    COPY
                                    </button>
                                </div>                                
                            </div>
                        <div>
                            <hr style="margin-left:-50px;color:black;">
                        </div>
                        </div>
                    </div>                    
                </div>
            </section>

            <section class="box-content-rewards" id="reset" v-show="(menuop === 'reset')">
                <div v-show="menuop === 'reset'">
                    <h2>Reset</h2>
                    <h4 style="padding-bottom:10px;margin-top:-10px;margin-left:2px;">Taps cleanup</h4>
                    <div id="form-todo form-group" style="width:955px;height:300px;padding-top:20px;padding-left:10px;">
                        <span>Reset to a factory-default state, cleaning up all settings changed in configuration.</span>
                        <br><br>
                        <button id="idBtnFactoryReset" type="button" @click="doFactoryReset" style="width:95px;height:40px;display:inline;margin-left:0px;">RESET</button>
                    </div>                    
                </div>
            </section>


        </div>
    </div>
</div>

<div class="container" v-if="isMobile === true" style="margin:none;padding:0px 0px 0px 0px;">
    <div id="mobileWelcome" class="text-center" v-show="isConnected === false">
        <section class="box-content-rewards" style="text-center" id="welcomeMobile" v-show="menuop === 'welcome' && isConnected === false">
            <div class="text-center" style="display:block;padding:20px;margin-top:60px;">
                <figure>
                    <img :src="images.logo" class="img-logo-taps" alt="TAPS" width="150">
                </figure>
                <br><br>
                <div style="background-color:transparent;width:100%;border:none;">
                    <span style="color:black;font-family: Verdana, sans-serif;font-weight: lighter;font-size:12px;">
                        The Easiest Way to Distribute<br>
                        Tezos Baking Rewards
                    </span>
                    <br><br>
                    <span style="color:grey;font-family: Verdana, sans-serif;font-weight: lighter;font-size:12px;">
                        Manage your cycle payments easily!<br>
                        Distribute rewards at a button click!
                    </span>
                    <br><br><br> 
                    <div style="width:100%;height:auto;border:none;">
                        <button type="button" id="idBtnConnect" class="botao-taps" v-on:click="connectWallet">CONNECT</button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="wrapper" style="background-color: black;height:80px;" v-show="isConnected === true">
        <div id="mobileHeader" v-show="isConnected === true">
            <div class="sidebar-header" style="margin-top:27px;margin-left:25px;">
                <!-- Top Navigation Menu -->
                <div class="topnav" id="topnav">

                    <figure>
                        <img :src="images.logo" class="img-logo-taps" alt="TAPS" width="70">
                    </figure>

                    <div style="position:absolute;top:12px;left:125px;">
                        <span class="roundedCornersMobile">             
                                {{connectedWalletAddress ? connectedWalletAddress.substr(0, 8) + '...' + connectedWalletAddress.substr(connectedWalletAddress.length - 8, connectedWalletAddress.length) : ''}}  
                        </span>
                    </div>

                    <!-- Navigation links (hidden by default) -->
                    <div id="myLinks">
                        <a href="#sidebar" v-on:click="setMenuOption('dashboard')">DASHBOARD</a>
                        <a href="#sidebar" v-on:click="setMenuOption('settings')">SETTINGS</a>
                        <a href="#sidebar" v-on:click="setMenuOption('delegators')">DELEGATORS</a>
                        <a href="#sidebar" v-on:click="setMenuOption('csvbatch')">CSV BATCH</a>
                        <a href="#sidebar" v-on:click="setMenuOption('bondpool')">BOND POOL</a>
                        <a href="#sidebar" v-on:click="setMenuOption('governance')">GOVERNANCE</a>
                        <a href="#sidebar" v-on:click="setMenuOption('reset')">RESET</a>
                        <a href="#sidebar" style="color:red;font-weight:bold;" v-on:click="createBatchTransaction">{{distributeButtonCaption}}</a>
                        <a href="#sidebar" v-on:click="disconnect">LOG OUT</a>
                    </div>

                    <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
                    <a href="javascript:void(0);" class="icon" v-on:click="toggleMobileMenu()">
                        <i class="fa fa-bars"></i>
                    </a>
                </div>

            </div>

            <div style="position:absolute;top:80px;left:0px;background-color:grey;width:100%;height:25px;font-size:11px;padding:3px;color:white;text-align:right;">
                <span>Balance: {{addressBalance ? addressBalance : ''}} {{addressBalance ? tezSymbol : ''}}</span>
            </div>
        </div>

        <div id="mobileBody" v-show="isConnected === true" style="position:relative;top:150px;width:100%;">

            <section id="dashboardMobile" v-show="(menuop === 'dashboard')">
                <h5>Dashboard</h5>
                <div id="form-todo form-group" style="width:calc(100vw - 17%);left:calc( (100vw - calc(100vw - 50px)) / 2 );">
                    <div v-show="this.bakerInfoLogo" style="position:absolute;margin-top:-45px;width:100%;height:20px;text-align:right;padding-right:25px;border:none;">
                        <div id="logoBaker">
                            {{this.bakerInfoName}} <img v-bind:src="this.bakerInfoLogo" width="30" height="30" style="border:none;text-aling:left;vertical-align:middle;">
                        </div>
                    </div>

                    <table class="table table-taps-alt" style="line-height:8px;margin-left:-10px;margin-top:0px;">
                        <tr>
                            <td class="title-mobile">Baking Address</td>
                            <td style="text-alignment:right;width:125px;">{{configuredBakerId ? configuredBakerId.substr(0, 6) + '...' + configuredBakerId.substr(configuredBakerId.length - 6, configuredBakerId.length) : 'Not Configured'}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Rewards Distrib Status</td>
                            <td style="text-alignment:right;width:125px;">
                                <toggle-button @change="toggleStatus()" :speed="200" :width="50" :value="tapsStatus" :sync="true" color="#c8b08b" :labels="{checked: 'On', unchecked: 'Off'}" :checked="tapsStatus" v-model="tapsStatus" style="margin-left:0px;margin-top:-6px;height:10px;"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="title-mobile">RPC Provider</td>
                            <td style="text-alignment:right;width:125px;">{{isRpcProviderOnline ? 'Online' : 'Alternative'}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Configured Baking Fee</td>
                            <td style="text-alignment:right;width:125px;">{{configuredDelegatorFee ? configuredDelegatorFee + '%' : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Min Deleg for Payout</td>
                            <td style="text-alignment:right;width:125px;">{{configuredMinAcceptedDelegatedAmount ? configuredMinAcceptedDelegatedAmount + tezSymbol : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Min Accepted Transfer</td>
                            <td style="text-alignment:right;width:125px;">{{configuredMinTransactionAmount ? configuredMinTransactionAmount + tezSymbol : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Current Delegators Total</td>
                            <td style="text-alignment:right;width:125px;">{{totalDelegators ? totalDelegators : computedUnavailable}}</td>
                        </tr>
                        <tr>
                            <td class="title-mobile">Cycle: Current/Rewards</td>
                            <td style="text-alignment:right;width:125px;">{{ currentCycle > 0 ? currentCycle +  " / " + rewardsPendingCycle : computedUnavailable  }}</td>
                        </tr>
                    </table>
                </div>
            </section>

            <section id="settingsMobile" v-show="(menuop === 'settings')">
                <div style="position:absolute;left:50%;top:200px;transform: translate(-46%, -50%);padding:10px;">
                <h5>Settings</h5>                    
                    <div v-show="this.bakerInfoLogo" style="position:absolute;left:225px;top:15px;">
                        <div id="logoBaker">
                            {{this.bakerInfoName}} <img v-bind:src="this.bakerInfoLogo" width="30" height="30" style="border:none;text-aling:left;vertical-align:middle;">
                        </div>
                    </div>
                    <div style="position:relative;width:100px;">
                        <p>
                            <label>
                                <span class="title-mobile">Baking Address
                                    <span><span class="errorRequired" style="margin-left:10px;"><span v-if="msg.configuredBakerId">{{msg.configuredBakerId}}</span></span></span>
                                </span>
                                <input id="idBakingAddress" name="bakingAddress" type="text" size="30" maxlength="36" v-model="configuredBakerId" @keypress="isAlphaNumeric($event)" class="form-control input-taps" placeholder="Enter your Tezos baking address" style="width:320px;text-align:center;font-size:12px;">
                            </label>
                        </p>
                        <p>
                            <label>
                                <span class="title-mobile">Tezos RPC Provider
                                    <span><span class="errorRequired" style="margin-left:10px;"><span v-if="msg.configuredRpcProvider">{{msg.configuredRpcProvider}}</span></span></span>
                                </span>
                                <select id="idProvider" name="provider" v-model="configuredRpcProvider" maxlength="70" class="form-control input-taps" placeholder="Enter a Tezos RPC gateway url" style="width:320px;text-align:center;font-size:12px;">
                                    <option disabled value="">Choose a provider...</option>
                                    <option v-for="option in providers" :value="option.value" :key="option.value">{{ option.text }}</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label>
                            </label>
                        <label>
                                <span class="title-mobile">&nbsp;</span>
                            </label>
                        </p>
                    </div>
                    
                    <div style="width:300px;height:50px;margin-left:75px;margin-top:-35px;">
                        <div style="margin-left:-75px;height:18px;">
                            <span class="title-mobile" style="padding-right:10px;">Baker Fee (%)</span>
                            <span class="title-mobile" style="padding-right:20px;">Min Deleg ({{tezSymbol}})</span>
                            <span class="title-mobile">Min TX Val ({{tezSymbol}})</span>
                        </div>
                        <div style="margin-left:-80px;">
                            <input id="idFee" name="fee" type="text" size="5" maxlength="5" v-model="configuredDelegatorFee" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Rewards fee" style="width:100px;text-align:center;font-size:12px;display:inline;margin:5px;">
                            <input id="idMinimumAcceptedDelegatedAmount" name="minimumAcceptedDelegatedAmount" type="text" size="5" maxlength="5" v-model="configuredMinAcceptedDelegatedAmount" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Min for payout" style="width:100px;text-align:center;font-size:12px;display:inline;margin:5px;">
                            <input id="idMinTransactionAmount" name="transactionAmount" type="text" size="5" maxlength="10" v-model="configuredMinTransactionAmount" @keypress="isNumber($event)" class="form-control input-taps" placeholder="Min tx amount" style="width:100px;text-align:center;font-size:12px;display:inline;margin:5px;">
                        </div>
                    </div>
                    
                    <br><br>

                    <div style="margin-left:5px;margin-top:10px;width:300px;height:50px;text-align:center;border:none;">
                        <div>
                            <button id="idBtnReset" type6="button" @click="resetSettings" style="width:95px;height:40px;display:inline;margin:5px;">DEFAULTS</button>
                            <button id="idBtnFetch" type="button" @click="fetchBakerDelegators(true)" style="width:75px;height:40px;display:inline;margin:10px;">SAVE</button>
                            <div style="position:absolute;width:200px;height:0px;top:10px;left:50px;"> 
                                <tile v-show="isLoading"></tile>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="delegatorsMobile" v-show="(menuop === 'delegators')">
                <div style="position:absolute;height:auto;left:52%;transform: translate(-55%, 0);padding:10px;">
                    <h5>Delegators</h5>
                    <h6>Payout Cycle: 
                        <input id="idCycleToPayMobile" name="cycleToPayMobile" type="text" align="center" size="2"  maxlength="10" v-model="payoutCycle" @keypress="isNumber($event)" value="payoutCycle" @change="fetchBakerDelegators(false)" placeholder="" style="text-align:center;font-size:12px;">&nbsp;
                        <button type="button" id="idBtnOkPayoutMobile" class="botao-taps" style="margin-left:05px;width:60px !important;">OK</button>
                        <p style="height:20px;">____________________</p>
                    </h6>

                    <div v-show="menuop === 'delegators' && (delegators.length == 0 || configuredBakerId.length == 0)">
                        <div id="form-todo form-group" style="position:absolute;width:100%;left:-10px;padding:0px;">
                            <br>
                            Please, configure your baker properties on SETTINGS to start.
                        </div>
                    </div>

                    <div v-show="menuop === 'delegators' && delegators.length > 0 && configuredBakerId.length > 0" style="width:100%;position:relative;">
                        <div style="float:left;height:100%;" v-show="doBondPoolPayments === true && bondpoolers.length > 0">
                            <!-- Bond Poolers -->
                            <br>
                            <table cellpadding="4" style="left:-15px;display:inline-block;"  v-show="doBondPoolPayments == true && bondpoolers.length > 0">
                                <thead style="font-size:12px;border:1px solid #89CFF0;color:white;background-color:#89CFF0;">
                                    <tr>
                                        <th style="text-align:left;" scope="col">Bondpooler</th>
                                        <th style="text-align:center;" scope="col">Share</th>
                                        <th style="text-align:center;" scope="col">Earnings</th>
                                        <th style="text-align:center;" scope="col">Fee</th>
                                        <th style="text-align:center;" scope="col">Payout</th>
                                    </tr>
                                </thead>

                                <tbody style="font-size:12px;">
                                    <tr>
                                        <td style="font-size: 0.9em;width:10px;" align="left">{{this.bakerInfoName}}</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">{{computedBakerPoolShare | formatPercentage}}%</td>
                                        <td style="font-size: 0.9em;width:200px;" align="center">{{((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100 | formatTez}}</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center"></td>
                                        <td style="font-size: 0.9em;width:10px;" align="center"></td>
                                    </tr>

                                    <tr v-for="(bondpooler,  index) in bondpoolers" :key="index">
                                        <td style="font-size: 0.9em;width:10px;" align="left">{{bondpooler.memberName}}</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">{{bondpooler.memberShare | formatPercentage}}%</td>
                                        <td style="font-size: 0.9em;width:200px;" align="center">{{((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100 | formatTez}}</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">{{bondpooler.memberFee}}%</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">
                                            {{(((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100) - (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * bondpooler.memberShare) / 100) * (bondpooler.memberFee/100) | formatTez }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style="font-size: 0.9em;width:10px;" align="left"></td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">{{(computedBakerPoolShare + computedPoolTotalShare) | formatPercentage}}%</td>
                                        <td style="font-size: 0.9em;width:200px;" align="center">{{computedPoolTotalEarnings + (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100) | formatTez}}</td>
                                        <td style="font-size: 0.9em;width:10px;" align="center"></td>
                                        <td style="font-size: 0.9em;width:10px;" align="center">{{computedPoolActualEarnings + (((((totalRewards - (computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * computedBakerPoolShare) / 100) | formatTez}}</td>
                                    </tr>

                                </tbody>
                            </table>
                            <br><br>
                            <!-- End of Bond Poolers -->
                        </div>
                        <div style="float:left;">
                            <br>
                            <table cellpadding="4">
                                <thead style="font-size:12px;font-weight:bold;line-height:10px;">
                                    <tr style="line-height:10px;">
                                        <th style="text-align:left;line-height:20px;" scope="col">Delegator</th>
                                        <th style="text-align:left;line-height:20px;" scope="col">Fee</th>
                                        <th style="text-align:left;line-height:20px;" scope="col">Rewards</th>
                                        <th style="text-align:left;line-height:20px;" scope="col">Pay?</th>                                
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(delegator,  index) in delegators" :key="index">
                                        <td style="font-size: 12px;line-height:20px;" align="left">{{ delegator.address.substr(0, 6) + '...' + delegator.address.substr(delegator.address.length - 6, delegator.address.length) }}</td>
                                        <td style="font-size: 12px;line-height:15px;display: inline-block;white-space: nowrap;" align="center">
                                            <input id="idDelegatorFee" name="delegatorFee" type="text" align="center" size="2"  maxlength="3" v-model="feeArray[index].fee" @keypress="isNumber($event)" value="feeArray[index].fee" @change="saveSettings" placeholder="" style="text-align: center;font-size: 12px;">&nbsp;%
                                        </td>
                                        <td style="font-size: 12px;line-height:20px;" align="center">
                                            {{(((totalRewards / ONE_MILLION) * (delegator.balance / stakingBalance))) - (((totalRewards / ONE_MILLION) * (delegator.balance / stakingBalance) * (feeArray[index].fee/100))) | formatTez }}{{tezSymbol}}
                                        </td>
                                        <td align="center" style="line-height:20px;">
                                            <toggle-button
                                            :value="payoutArray[index].value"
                                            :sync="true"
                                            :labels="true"
                                            :disabled="false"
                                            color="#c8b08b"
                                            :key="index"
                                            @change="toggle(index)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
  
                        <!-- Totals -->
                        <div style="float:left;clear:left;" v-show="(delegators.length > 0 && configuredBakerId.length > 0)">
                            <br>
                            <table class="table table-taps-alt">
                                <thead>
                                    <tr>
                                        <th style="text-align:center;" scope="col">Total</th>
                                        <th style="text-align:center;" scope="col"></th>
                                        <th style="text-align:center;" scope="col"></th>
                                        <th style="text-align:center;" scope="col"></th>
                                        <th style="text-align:center;" scope="col">Rewards</th>
                                        <th style="text-align:center;" scope="col"></th>
                                        <th style="text-align:right;" scope="col">Actual</th>
                                        <th style="text-align:center;" scope="col"></th>                                
                                    </tr>
                                </thead>

                                <tbody>
                                    <td style="font-size: 0.9em;" align="center">{{delegators.length}}</td>
                                    <td style="font-size: 0.9em;" align="left">&nbsp;</td>
                                    <td style="font-size: 0.9em;" align="center">&nbsp;</td>
                                    <td style="font-size: 0.9em;" align="center"></td>
                                    <td style="font-size: 0.9em;" align="center">{{computedTotalDelegatorsRewards | formatTez }}{{tezSymbol}}</td>
                                    <td style="font-size: 0.9em;" align="center">&nbsp;</td>
                                    <td style="font-size: 0.9em;" align="right">{{computedTotalDelegatorsActual | formatTez }}{{tezSymbol}}</td>
                                    <td align="center">&nbsp;</td>
                                </tbody>
                            </table>
                            <br><br>
                        </div>
                        <!-- Totals -->

                    </div>
                </div>
            </section>

            <section id="csvbatchMobile" v-show="menuop === 'csvbatch'">
                <div style="position:absolute;left:50%;top:200px;transform: translate(-55%, -50%);padding:10px;">
                    <h5 style="margin-left:-10px;margin-top:-20px;">CSV Batch</h5>
                    <div v-show="menuop === 'csvbatch' && configuredBakerId.length == 0">
                        <div id="form-todo form-group" style="width:100%;">
                            <br>
                            Please, configure your baker properties on SETTINGS to start.
                        </div>
                    </div>
                    <div v-show="menuop === 'csvbatch' && configuredBakerId.length > 0">
                        <div id="form-todo form-group" style="width:100%;left:-10px;padding:0px;font-size:12px;">
                            Import a standard CSV file as source<br>for a manual batch operation.<br>
                            <br>
                            Requirements:<br>
                            <br>
                            <ul>
                                <li>
                                    Delimiter must be a comma (",").<br>
                                </li>
                                <li>
                                    Only two columns, without headers.<br>
                                </li>
                                <li>
                                    First column: destination address.<br>
                                </li>
                                <li>
                                    Last column: amount in militez (1000000 = 1 tez).<br>
                                </li>
                            </ul> 
                            Sample File:<br><br>
                            <table cellspacing="0" cellpadding="2" style="margin-left:5px;border:1px solid black;">
                                <tr>
                                    <td>tz1S37hEZnNrAXfzuRYSjG9Qxq8VrwpWaukB,1000000</td>
                                </tr>
                                <tr>
                                    <td>tz1ZvZLYPYoH2Xm4tX1xprqLZZnXc1kYM4ji,3000000</td>
                                </tr>
                                <tr>   
                                    <td>KT1XFqZeHDPw4TmkjgCN5knsYvZYGj2r5c3F,2500000</td>
                                </tr>
                            </table>
                            <br><br>

                            <div style="border-style:none;height:auto;">
                                <input type="file" ref="doc" @change="readFile()" accept=".csv,.CSV,.txt,.TXT" />
                                
                                <br><br><br>

                                <table class="table table-taps-alt" v-show="parsedCsv != null">
                                    <thead class="head-table-taps">
                                    <tr>
                                        <th style="text-align:center;" scope="col"></th>
                                        <th style="text-align:left;" scope="col">Destination Address</th>
                                        <th style="text-align:center;" scope="col">Amount</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(row,  index) in parsedCsv" :key="index">
                                        <td style="font-size: 0.9em;" align="center">{{index + 1}}</td>
                                        <td style="font-size: 0.9em;" align="left">{{row[0]}}</td>
                                        <td style="font-size: 0.9em;" align="center">{{row[1] / ONE_MILLION}}&nbsp;{{tezSymbol}}</td> 
                                        </tr>

                                        <tr>
                                            <td align="left"><b>Total</b></td>
                                            <td align="left"></td>
                                            <td align="center"><b>{{computedTotalSumCsv / ONE_MILLION}}&nbsp;{{tezSymbol}}</b></td>
                                        </tr>

                                    </tbody>

                                </table>

                                <div v-show="parsedCsv != null">
                                    <button v-on:click="createCustomCsvBatchTransaction()" id="idBtnSendBatch" type="button" style="width:125px;height:40px;display:inline;margin-left:0px;">SEND BATCH</button>
                                    <br><br><br><br><br>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section id="bondpoolMobile" class="box-content-rewards" v-show="menuop === 'bondpool'">
                <div style="position:absolute;height:auto;left:52%;transform: translate(-50%, 0);padding:10px;">
                    <h5>Bond Pool</h5>
                    <div v-show="menuop === 'bondpool' && configuredBakerId.length == 0">
                        <div id="form-todo form-group" style="width:100%;">
                            <br>
                            Please, configure your baker properties on SETTINGS to start.
                        </div>
                    </div>
                    <div v-show="menuop === 'bondpool' && configuredBakerId.length > 0">
                        <div style="width:100%;left:0px;font-size:12px;">
                            Configure your bond pool<br>
                            <br>
                            <input type="checkbox" id="idDoBondPoolPayments" v-model="doBondPoolPayments" value="doBondPoolPayments" @click="toggleBondPoolPayments()" />&nbsp;&nbsp;&nbsp;Do bond pool payments on every distribution
                            <br>
                            <br>
                            Distribute cycle rewards income remaining funds<br>
                            (after delegators have been paid) among configured<br>
                            private participants of the baker.<br>
                            <br>
                            Add/update/remove members
                            <br><br>

                            <div style="width:80%;height:auto;margin-left:0px;margin-top:0px;border:none;">
                                <table>
                                    <tr style="height:50px;">
                                        <td><input type="text" id="idAddress" v-model="memberAddress" placeholder="Address" style="padding-right:5px;display:inline-block;text-align:left;width:320px;" class="form-control input-taps"></td>
                                    </tr>
                                    <tr style="height:50px;">
                                        <td><input type="text" id="idAmount" v-model="memberAmount" @keypress="isNumber($event)" maxlength="20" placeholder="Amount (XTZ)" style="padding:5px;display:inline-block;text-align:left;width:320px;" class="form-control input-taps"></td>
                                    </tr>
                                    <tr style="height:50px;">
                                        <td><input type="text" id="idFee" v-model="memberFee" @keypress="isNumber($event)" maxlength="3" placeholder="Fee (%)" size="5" style="padding:5px;display:inline-block;text-align:left;width:320px;" class="form-control input-taps"></td>
                                    </tr>
                                    <tr style="height:50px;">
                                        <td><input type="text" id="idName" v-model="memberName" placeholder="Member name" style="padding:5px;display:inline-block;text-align:left;width:320px;" class="form-control input-taps"></td>
                                    </tr>
                                    <tr style="height:50px;">
                                        <td align="center"><input type="button" @click="addBondPoolMember()" class="add-row" value="ADD" style="margin-top:30px;margin-bottom:20px;padding:5px;display:inline-block;text-align:center;width:50px;"></td>
                                    </tr>
                                </table>
                            </div>

                            <br>

                            <table class="table table-taps-fees" id="id_members" style="width:96%;">
                                    <thead>
                                    <tr>
                                        <th style="text-align:left;" scope="col">Address</th>
                                        <th style="text-align:center;" scope="col">Amount (XTZ)</th>
                                        <th style="text-align:left;" scope="col">Fee (%)</th>
                                        <th style="text-align:left;" scope="col">Name</th>
                                        <th style="text-align:center;" scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody class="members_class" id="idMembers">
                                    <tr style="line-height:80px;font-size:13px;" v-show="bondpoolers != null && bondpoolers.length == 0">
                                        <td colspan="7" id="id_nomembers">
                                            <center>There are no bond pool members registered yet</center>
                                        </td>
                                    </tr>

                                    <tr v-for="(bondpooler,  index) in bondpoolers" :key="index">
                                        <td align="left">
                                            <input name="memberAddress" id="idMemberAddress" v-model="bondpooler.memberAddress" type="text" readonly style="border:none;background:none;width:50px;">
                                        </td>

                                        <td align="center" >
                                            <input name="memberAmount" id="idMemberAmount" size="5" maxlength="20" v-model="bondpooler.memberAmount" v-on:focus="processMemberAmount($event, index)" ref="myMemberAmountInput" @keypress="isNumber($event)" @keyup="isValidAmount($event, bondpooler.memberAmount, index)" type="text" style="text-align:right;width:50px;" class="name_amount">
                                        </td>

                                        <td align="center" >
                                            <input name="memberFee" id="idMemberFee" size="5" maxlength="3" v-model="bondpooler.memberFee" @keypress="isNumber($event)" @keyup="isValidPercentage($event, bondpooler.memberFee, index)" type="text" style="text-align:right;width:30px;">
                                        </td>

                                        <td align="center">
                                            <input name="memberName" id="idMemberName" v-model="bondpooler.memberName" @keyup="isValidName($event, bondpooler.memberName)" type="text" style="width:60px;">
                                        </td>

                                        <td align="left">
                                            <img :src="images.delete" style="cursor:pointer;margin-top:-3px;margin-left:-15px;margin-right:30px;" width="30" height="30" @click="removeBondPoolMember(index)" />
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                            <br><br>
                        </div>
                    </div>
                </div>
            </section>

            <section class="box-content-rewards" id="governanceMobile" v-show="(menuop === 'governance')">
                    <div v-show="menuop === 'governance'" style="position:absolute;height:auto;left:52%;transform: translate(-50%, 0);padding:10px;">                        
                    <h5>Governance</h5>
                    <h6 style="padding-bottom:10px;margin-top:-10px;margin-left:2px;">Tezos Proposals Voting</h6>
                    <div v-show="menuop === 'governance' && configuredBakerId.length == 0">
                        <div id="form-todo form-group" style="width:100%;padding-left:20px;">
                            <br>
                            Please, configure your baker properties on SETTINGS to start.
                        </div>
                    </div>
                    <div v-show="menuop === 'governance' && configuredBakerId.length > 0" id="form-todo form-group" style="width:400px;left:0px;font-size:12px;height:auto;padding-top:0px;padding-left:10px;padding-bottom:30px;">
                        <div v-for="(proposal,  index) in proposals" :key="index" v-show="true">
                            <br>
                            <table style="border:1px solid black;width:90%;padding:5px;">
                                <thead>
                                    <tr style="background-color:#c5a87c;color:white;">
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Name</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td style="border:1px solid black;font-size: 0.9em;width:50px;padding:10px;" align="center">{{capitalizeFirstLetter(proposal.alias)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:50px;padding:10px;" align="center">{{capitalizeFirstLetter(proposal.status)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br><br>
                            <table style="border:1px solid black;width:90%;padding:5px;">
                                <thead>
                                    <tr style="background-color:#c5a87c;color:white;">
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Hash</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td style="border:1px solid black;font-size: 0.9em;width:50px;padding:10px;" align="center">{{proposal.hash}}</td>                                    </tr>
                                </tbody>
                            </table>
                            <br><br>
                            <table v-show="proposal.status === 'active'" style="border: 1px solid black;width:90%;padding:5px;">
                                <thead>
                                    <tr style="background-color:#c5a87c;color:white;">
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Period</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">Start Time</th>
                                        <th style="border:1px solid black;text-align:left;padding:5px;" scope="col">End Time</th>
                                    </tr>
                                    </thead>

                                <tbody>
                                    <tr>
                                        <td style="border:1px solid black;font-size: 0.9em;width:30%;padding:10px;" align="center">{{capitalizeFirstLetter(currentProposalKind)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:40%;padding:10px;" align="center">{{dateBackFrom(currentProposalStartTime)}}</td>
                                        <td style="border:1px solid black;font-size: 0.9em;width:30%;padding:10px;" align="center">{{dateForwardTo(currentProposalEndTime)}}</td> 
                                    </tr>
                                </tbody>
                            </table>
                            <br><br>
                            <div v-show="proposal.status === 'active'" style="position:relative;height:100px;;margin-top:5px;text-align:center;width:290px;">
                                <div style="width:auto;display:inline-block;padding:20px;">Cast vote:</div>
                                <img :src="images.yay" class="clickable" alt="Yay" v-on:click="vote(configuredBakerId, proposal.hash, 'yay', proposal.kind, index)" style="padding-right:10px;">
                                <img :src="images.nay" class="clickable" alt="Nay" v-on:click="vote(configuredBakerId, proposal.hash, 'nay', proposal.kind, index)" style="padding-right:10px;" v-show="proposal.kind != 'proposal'">
                                <img :src="images.pass" class="clickable" alt="Pass" v-on:click="vote(configuredBakerId, proposal.hash, 'pass', proposal.kind, index)" style="padding-right:10px;" v-show="proposal.kind != 'proposal'">
                            </div>
                            <div v-show="proposals[index].myVoteCommand.length > 0">
                                <div style="position:relative;width:90%;margin-top:-20px;margin-bottom:50px;border:1px solid black;padding:10px;display:inline-block;font-size:14px;">
                                    <textarea type="text" ref="myVoteInput" v-model="proposals[index].myVoteCommand" style="width:90%;border:none;height:90px;resize:none;" readonly />
                                    <button 
                                        type="button"
                                        v-clipboard:copy="proposals[index].myVoteCommand"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        style="position:relative;margin-left:120px;top:65px;width:95px;height:40px;display:inline-block;margin-top:-25px;">
                                    COPY
                                    </button>
                                </div>                                
                            </div>
                        <div>
                            <hr style="margin-left:-50px;color:black;">
                        </div>
                        </div>
                    </div>                    
                </div>
            </section>

            <section id="resetMobile" v-show="(menuop === 'reset')">
                <div v-show="menuop === 'reset'">
                    <div style="position:absolute;width:300px;left:50%;top:200px;transform: translate(-55%, -50%);padding:10px;">
                        <h5>Reset</h5>
                        <span style="padding-bottom:10px;margin-top:-30px;margin-left:2px;font-size:13px;">Taps cleanup</span>
                        <div id="form-todo form-group" style="width:100%;height:300px;padding-top:20px;padding-left:10px;font-size:12px;">
                            <span>Reset to a factory-default state, cleaning up all settings changed in configuration.</span>
                            <br><br><br>
                            <button id="idBtnFactoryReset" type="button" @click="doFactoryReset" style="width:95px;height:40px;display:inline;margin-left:0px;">RESET</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>

</div></div>
</template>

<script>

// Imports.
import axios from 'axios'
import numeral from 'numeral';
import { TezosToolkit, OpKind } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import jsPDF from 'jspdf';
import { formatDistance, parseISO } from 'date-fns';

// Constants.
const ONE_MILLION = 1000000;
const TEZ_SYMBOL = 'ꜩ';
const GET_TEZOS_HEAD_URL = 'https://api.tzkt.io/v1/head';
const GET_TEZOS_REWARDS_SPLIT_URL = 'https://api.tzkt.io/v1/rewards/split/';
const GET_PROPOSALS_LIST_URL = 'https://api.tzkt.io/v1/voting/proposals';
const GET_PROPOSALS_CURRENT_URL = 'https://api.tzkt.io/v1/voting/periods/current';
const TEZOS_REWARDS_SPLIT_RESPONSE_LIMIT = '10000';
const CHECK_RPC_ONLINE_SUFFIX = '/chains/main/blocks/head/';
const GET_BAKER_INFO_URL = 'https://api.baking-bad.org/v2/bakers/';
const TEZOS_RPC_PROVIDER_01 = 'https://mainnet.smartpy.io/';
const TEZOS_RPC_PROVIDER_02 = 'https://rpc.tzkt.io/mainnet';
const TEZOS_RPC_PROVIDER_03 = 'https://mainnet.tezos.org.ua';
const TEZOS_RPC_PROVIDER_04 = 'https://tezos-prod.cryptonomic-infra.tech';
const TEZOS_RPC_PROVIDER_05 = 'https://teznode.letzbake.com';
const TEZOS_RPC_PROVIDER_06 = 'https://rpc.tzbeta.net/';
const TEZOS_RPC_PROVIDER_07 = 'https://mainnet.api.tez.ie';
const TEZOS_RPC_PROVIDER_08 = 'https://mainnet-tezos.giganode.io/';
const TEZOS_RPC_PROVIDER_09 = 'https://mainnet.tezrpc.me';

const UNAVAILABLE_MESSAGE = 'Unavailable';

export default {
    data: function (){
        return {
            // Variables declaration.
            Tezos: null,
            wallet: null,
            activeAccount: null,
            connectedWalletAddress: '',
            addressBalance: 0,
            // Constants.
            tezSymbol: TEZ_SYMBOL,
            ONE_MILLION: ONE_MILLION,
            UNAVAILABLE_MESSAGE: UNAVAILABLE_MESSAGE,
            // Default values.
            defaultRpcProvider: TEZOS_RPC_PROVIDER_01,
            alternativeRpcProvider: TEZOS_RPC_PROVIDER_02,
            defaultDelegatorFee: '10',
            defaultMinAcceptedDelegatedAmount: '0.01',
            defaultMinTransactionAmount: '0.0001',
            // Baker related information.
            bakerInfoName: '',
            bakerInfoLogo: '',
            bakerInfoFee: '',
            bakerBalance: 0,
            fileContent: null,
            parsedCsv: null,
            // User configured values.
            configuredRpcProvider: TEZOS_RPC_PROVIDER_01,
            configuredDelegatorFee: '10',
            configuredMinAcceptedDelegatedAmount: '0.01',
            configuredMinTransactionAmount: '0.0001',
            configuredBakerId: '',
            myCsvFile: '',
            csvBatchTablePosition: '',
            memberAddress: '',
            memberAmount: '',
            memberShare: 0,
            memberFee: '',
            memberName: '',
            previousMemberAmount: '',
            // Flow control variables.
            doBondPoolPayments: false,
            poolTotalBalance: 0,
            poolTotalShare: 0,
            poolTotalEarnings: 0,
            poolTotalActual: 0,
            isMobile: true,
            isConnected : false,
            isRpcProviderOnline: false,
            tapsStatus: false,
            response: '',
            menuop: 'welcome',
            distributeButtonCaption: '',
            msg: [],
            isLoading: false,
            // Tezos blockchain related values.
            currentCycle: 0,
            payoutCycle: 0,
            stakingBalance: 0,
            totalRewards: 0,
            totalDelegators: 0,
            currentProposalStartTime: '',
            currentProposalEndTime: '',
            currentProposalKind: '',
            currentProposalStatus: '',
            myVoteCommand: '',
            // Data structures.
            delegators: [],
            feeArray: [],
            payoutArray: [],
            myBatchArray: [],
            bondpoolers: [],
            proposals:[],
            governancePeriods:[],
            providers: [
                          { value: TEZOS_RPC_PROVIDER_01, text: TEZOS_RPC_PROVIDER_01 },
                          { value: TEZOS_RPC_PROVIDER_02, text: TEZOS_RPC_PROVIDER_02 },
                          { value: TEZOS_RPC_PROVIDER_03, text: TEZOS_RPC_PROVIDER_03 },
                          { value: TEZOS_RPC_PROVIDER_04, text: TEZOS_RPC_PROVIDER_04 },
                          { value: TEZOS_RPC_PROVIDER_05, text: TEZOS_RPC_PROVIDER_05 },
                          { value: TEZOS_RPC_PROVIDER_06, text: TEZOS_RPC_PROVIDER_06 },
                          { value: TEZOS_RPC_PROVIDER_07, text: TEZOS_RPC_PROVIDER_07 },
                          { value: TEZOS_RPC_PROVIDER_08, text: TEZOS_RPC_PROVIDER_08 },
                          { value: TEZOS_RPC_PROVIDER_09, text: TEZOS_RPC_PROVIDER_09 }
                       ],
            // Images referenced on template.
            images: {
                logo: require('../assets/imgs/taps_logo_dourada.png'),
                save: require('../assets/imgs/save.png'),
                pdf: require('../assets/imgs/pdf.jpg'),
                clipboard: require('../assets/imgs/clipboard.png'),
                delete: require('../assets/imgs/delete.png'),
                settings: require('@/assets/imgs/settings.svg'),
                logout: require('@/assets/imgs/logout.svg'),
                aqueduct: require('@/assets/imgs/aqueduct.jpg'),
                yay: require('../assets/imgs/thumbs_up.png'),
                nay: require('../assets/imgs/thumbs_down.png'),
                pass: require('../assets/imgs/abstain.png')
            }
        };
    },  
    methods:
    {
        /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
        toggleMobileMenu()
        {
            var x = document.getElementById("myLinks");
            var y = document.getElementById("topnav");

            if ((x != null)&&(y != null))
            {
                if (x.style.display === "none") {
                    x.style.display = "inline-block";
                    x.style.left = "200px";
                    y.style.height = "500px";
                } else {
                    x.style.display = "none";
                    y.style.height = "55px";
                }
            }



        }, 


        // Specifies which page will be shown upon user menu selection.
        setMenuOption(option) 
        {
            this.menuop = option;
            this.toggleMobileMenu();
        },
        // Bring back default values to configuration.
        resetSettings() 
        {
            this.msg = [];
            this.feeArray = [];
            this.payoutArray = [];
            this.myBatchArray = [];
            this.delegators = [];
            this.bondpoolers = [];            
            this.tapsStatus = false;
            this.totalDelegators = 0;
            this.isRpcProviderOnline = false;
            this.response = '';
            this.currentCycle = 0;
            this.stakingBalance = 0;
            this.totalRewards = 0;
            this.totalDelegators = '';
            this.configuredBakerId = '';
            this.configuredRpcProvider = this.defaultRpcProvider;
            this.configuredMinAcceptedDelegatedAmount = this.defaultMinAcceptedDelegatedAmount;
            this.configuredMinTransactionAmount = this.defaultMinTransactionAmount;
            this.configuredDelegatorFee = this.bakerInfoFee ? this.bakerInfoFee : this.defaultDelegatorFee;
            this.bakerInfoName = '';
            this.bakerInfoLogo = '';
            this.bakerInfoFee = '';
            this.doBondPoolPayments = false;
            this.memberAddress = '';
            this.memberAmount = '';
            this.memberShare = '';
            this.memberFee = '';
            this.memberName = '';
        },
        // Bring back default values to configuration.
        cleanupSettings() 
        {
            this.msg = [];
            this.feeArray = [];
            this.payoutArray = [];
            this.myBatchArray = [];
            this.delegators = [];
            this.bondpoolers = [];
            this.tapsStatus = false;
            this.configuredBakerId = '';
            this.configuredRpcProvider = '',
            this.configuredDelegatorFee = '';
            this.configuredMinAcceptedDelegatedAmount = '';
            this.configuredMinTransactionAmount = '';
            this.doBondPoolPayments = false;
            this.memberAddress = '';
            this.memberAmount = '';
            this.memberShare = '';
            this.memberFee = '';
            this.memberName = '';
        },
        // Stores current configuration on browser's local storage.
        saveSettings() 
        {
            if (this.configuredBakerId)
            {
                // Saves configuration on local storage.
                localStorage.setItem('tapsStatus', JSON.stringify(this.tapsStatus));
                localStorage.setItem('tapsConfiguredBakerID', this.configuredBakerId);
                localStorage.setItem('tapsConfiguredRpcProvider', this.configuredRpcProvider);
                localStorage.setItem('tapsConfiguredDelegatorFee', this.configuredDelegatorFee);
                localStorage.setItem('tapsConfiguredMinAcceptedDelegatedAmount', this.configuredMinAcceptedDelegatedAmount);
                localStorage.setItem('tapsConfiguredMinTransactionAmount', this.configuredMinTransactionAmount);
                localStorage.setItem("tapsFeeArray", JSON.stringify(this.feeArray));
                localStorage.setItem("tapsPayoutArray", JSON.stringify(this.payoutArray));
                localStorage.setItem("tapsBondpoolersArray", JSON.stringify(this.bondpoolers));
                localStorage.setItem('tapsDoBondPoolPayments', JSON.stringify(this.doBondPoolPayments));
            }

        },
        // Checks if there is already a baker configured.
        isBakerConfigured(justCheck) 
        {
            // Checks if there is already a baker configured on Taps settings.

            let storedBakerId = localStorage.getItem('tapsConfiguredBakerID');
            if (storedBakerId) 
            { 
                if (justCheck == false)
                {
                    // Loads previously stored baker's data.
                    this.loadCurrentConfiguredBakerData();
                }
                return true;                
            }
            else 
            { 
               return false;                
            }

        },
        // Brings back from browser's local storage the previously saved Taps configuration.
        loadCurrentConfiguredBakerData() 
        {
            // Get baker's settings from localStorage.
            this.tapsStatus = JSON.parse(localStorage.getItem('tapsStatus'));
            this.configuredBakerId = localStorage.getItem('tapsConfiguredBakerID');
            this.configuredRpcProvider = localStorage.getItem('tapsConfiguredRpcProvider');
            this.configuredDelegatorFee =localStorage.getItem('tapsConfiguredDelegatorFee');
            this.configuredMinAcceptedDelegatedAmount = localStorage.getItem('tapsConfiguredMinAcceptedDelegatedAmount');
            this.configuredMinTransactionAmount = localStorage.getItem('tapsConfiguredMinTransactionAmount');
 
            // Automatically fetches delegators again.
            this.fetchBakerDelegators(false);

            // Reloads previously tailored fees array.
            this.feeArray = JSON.parse(localStorage.getItem("tapsFeeArray"));

            // Reloads previously tailored payouts array.
            this.payoutArray = JSON.parse(localStorage.getItem("tapsPayoutArray"));

            // Reloads previously tailored bond poolers array.
            this.bondpoolers = JSON.parse(localStorage.getItem("tapsBondpoolersArray"));
            if (this.bondpoolers == null)
            {
                this.bondpoolers = [];
            }

            // Gets bond pool payments previosly stored configuration.
            this.doBondPoolPayments = JSON.parse(localStorage.getItem('tapsDoBondPoolPayments'));

            this.toggleStatus();
        },
        // Tries to connect to a Tezos wallet upon CONNECT button click.
        connectWallet()
        {
            // Checks if there is already a wallet instantiated, and try to connect to it.
            this.initWallet(true);
        },
        // Disconnets from Tezos wallet and cleans flow variables.
        async disconnect() 
        {
                if (this.wallet)
                {
                    try
                    {
                        await this.wallet.clearActiveAccount();
                    }
                    catch(error)
                    {
                        console.log(error)
                    }
                    finally 
                    {
                        this.wallet = null
                    }
                }
                this.cleanupSettings();
                this.isConnected = false           
                this.menuop = 'welcome'
                this.activeAccount = null;

        },
        showSuccessMessage(showResultMessages)
        { 
            if(showResultMessages)
            {
                this.$fire({
                title: "Success!",
                text: "Configurations saved!",
                type: "success",
                timer: 5000
                }).then(r => {
                console.log(r.value);
                })
            }
        },
        // Fetches information about the configured baker's delegators and stores it in memory for future use.
        fetchBakerDelegators(showResultMessages)
        {

            if (this.msg['configuredBakerId'])
            {
                if (this.msg['configuredBakerId'].toLowerCase() == 'invalid address')
                {
                this.$alert("Please provide a valid Tezos address");
                return false;
                }
            }

            if (!this.configuredBakerId)
            {
               this.$alert("Baking address required to proceed!");
               return false;               
            }

            if (!this.configuredRpcProvider)
            {
               this.$alert("RPC provider required to proceed!");
               return false;               
            }

            if (!this.configuredDelegatorFee)
            {
               this.$alert("Baker rewards fee required to proceed!");
               return false;               
            }
     
            if (isNaN(this.configuredDelegatorFee))
            {
               this.$alert("Baker Fee must be a valid number!");
               return false;               
            }

            if (isNaN(this.configuredMinAcceptedDelegatedAmount))
            {
               this.$alert("Minimum Delegation must be a valid number!");
               return false;               
            }

            if (isNaN(this.configuredMinTransactionAmount))
            {
               this.$alert("Min Transaction Value must be a valid number!");
               return false;               
            }

            this.isLoading = true;
     
            // Gets additional information about the baker.
            this.fetchBakerAdditionalInfo(this.configuredBakerId);

            try
            {
                axios
                .get(GET_TEZOS_HEAD_URL)
                .then(response => ( this.currentCycle = response.data.cycle,
                                    this.payoutCycle == 0 ? this.payoutCycle = this.currentCycle - 6 : this.payoutCycle,
                                    axios
                                        .get(GET_TEZOS_REWARDS_SPLIT_URL + this.configuredBakerId + '/' + parseInt(this.payoutCycle == 0 ? (this.currentCycle - 6) : this.payoutCycle) + '?limit=' + TEZOS_REWARDS_SPLIT_RESPONSE_LIMIT)
                                        .then(response => (
                                                            this.totalDelegators = response.data.delegators.length,
                                                            this.delegators = response.data.delegators,
                                                            this.stakingBalance = response.data.stakingBalance,
                                                            this.totalRewards = (response.data.ownBlockRewards +
                                                                                response.data.extraBlockRewards +
                                                                                response.data.endorsementRewards +
                                                                                response.data.ownBlockFees +
                                                                                response.data.extraBlockFees +
                                                                                response.data.futureBlockRewards + 
                                                                                response.data.futureEndorsementRewards +
                                                                                response.data.doubleBakingRewards +
                                                                                response.data.doubleEndorsingRewards +
                                                                                response.data.revelationRewards) - 
                                                                                (response.data.doubleBakingLostDeposits + 
                                                                                response.data.doubleBakingLostRewards +
                                                                                response.data.doubleBakingLostFees + 
                                                                                response.data.doubleEndorsingLostDeposits,
                                                                                response.data.doubleEndorsingLostRewards,
                                                                                response.data.doubleEndorsingLostFees,
                                                                                response.data.revelationLostRewards +
                                                                                response.data.revelationLostFees),

                                                                                this.initializeArrays(),

                                                                                // Checks if user has changed baking fee.
                                                                                this.checkChangedBakingFee(),

                                                                                // Filters data based on SETTINGS.
                                                                                this.applyConfiguredFilters(),

                                                                                // Stores configured data on localStorage.
                                                                                this.saveSettings(),

                                                                                // Hides loading animation.
                                                                                this.isLoading = false,

                                                                                // Warns user about successful fetch.
                                                                                this.showSuccessMessage(showResultMessages)

                                                        ) )
                                        .catch(error => { this.isLoading = false; console.log(error) })))
                .catch(error => { this.isLoading = false; console.log(error) })
            }
            catch(error)
            {
                console.log(error);
            }

        },
        fetchBakerAdditionalInfo(address)
        {
            try
            {
                axios
                .get(GET_BAKER_INFO_URL + address)
                .then(response => ( this.bakerInfoName = response.data.name,
                                    this.bakerInfoLogo = response.data.logo,
                                    this.bakerInfoFee = (response.data.fee * 100),
                                    this.bakerBalance = response.data.balance
                                ) )
                                .catch(error => { console.log(error) })
            }
            catch(error)
            {
                console.log(error);
            }

        },
        // Tries to initiate a wallet (it can be present in memory or not), and tries to connect to it (if specified to).
        async initWallet(alsoConnect)
        {

            // Checks if there is already a baker configured on localStorage (and loads it).
            let result = this.isBakerConfigured(false);

            // Sets some defaults.
            if (result == false)
            {
                this.configuredDelegatorFee = '10';
                this.configuredMinAcceptedDelegatedAmount = '0.01';
                this.configuredMinTransactionAmount = '0.0001';
            }

            if (this.Tezos == null)
            {
                // Tezos gateway and wallet definitions.
                const Tezos = new TezosToolkit(this.configuredRpcProvider);
                Tezos.setProvider({ rpc: this.configuredRpcProvider ? this.configuredRpcProvider : this.defaultRpcProvider });
                this.Tezos = Tezos;
            }

            if (this.wallet == null)
            {
                const wallet = new BeaconWallet({ name: 'Taps wallet'});
                // Tells Taquito to use Beacons to send transactions.
                this.wallet = wallet;
                this.Tezos.setWalletProvider(this.wallet);
            }

            // Tries to instantiate the wallet. It may be present, already.
            try
            {
                var activeAccount = await this.wallet.client.getActiveAccount();
            }
            catch(error)
            {
                // There was no wallet present, so splash page should still be shown (not logged in).

                // Hides the inner pages.
                this.menuop = 'welcome'
                this.isConnected = false
                this.connectedWalletAddress = null

                console.log('Could not get active account. ', error);

            }
            finally
            {
                // Double-checks if the wallet is present. If not, splash page should still be shown (not logged in)...
                if (activeAccount == null)
                {
                    // Hides the inner pages.
                    this.menuop = 'welcome';
                    this.isConnected = false;
                    this.connectedWalletAddress = null;
                    this.addressBalance = 0;

                    console.log("Not connected!");

                    // ... nevertheless, the user might be trying to connect to a wallet...
                    if (alsoConnect)
                    {

                        let permissions = null;
      
                        // Asks to wallet for permissions.
                        try 
                        {
                            permissions = await this.wallet.client.requestPermissions();

                            // Successfully connected to wallet!
                            this.activeAccount = permissions;
                            console.log("Connected:", this.activeAccount.address);

                            // Sets the connected wallet address.
                            this.connectedWalletAddress = permissions.address;

                            // Shows the inner pages (user has logged in).
                            this.menuop = 'dashboard'
                            this.isConnected = true

                            // Gets user balance.
                            let userBalance = await this.Tezos.tz.getBalance(this.connectedWalletAddress);
                            this.addressBalance = userBalance / ONE_MILLION;

                        }
                        catch(error)
                        {
                            console.log(error)
                        }

                    }


                }
                else 
                {

                    // There IS indeed an active account (wallet is present).

                    // Shows the inner pages.
                    this.isConnected = true;
                    this.menuop = 'dashboard';
                    this.addressBalance = 0;

                    this.activeAccount = activeAccount;
                    console.log("Already connected:", this.activeAccount.address);
                    this.connectedWalletAddress = this.activeAccount.address

                    // Gets user balance.
                    let userBalance = await this.Tezos.tz.getBalance(this.connectedWalletAddress);
                    this.addressBalance = userBalance / ONE_MILLION;

                }
            }
        },
        // Handles the delegators checkboxes that will determine who is going to be paid or not.
        toggle (index) 
        {
            this.payoutArray[index].value = !this.payoutArray[index].value;
            this.saveSettings();            
        },
        // Depending on which status Taps is configured, main action button will show "DISTRIBUTE" or "SIMULATE".
        toggleStatus ()
        {
            // Changes DISTRIBUTE button caption according to status.
            if (this.tapsStatus === true) 
            {
                this.distributeButtonCaption = 'DISTRIBUTE';
            }
            else
            {
                this.distributeButtonCaption = 'SIMULATE ';
            }

            this.saveSettings();

        },
        // Creates the batch transaction upon user request.
        createBatchTransaction() 
        {

            // Checks if there is a baker configured on SETTINGS.
            if ((this.configuredBakerId)&&(this.delegators.length > 0))
            {
 
                // Asks for user's confirmation.
                this.$confirm("Proceed with rewards " + (this.tapsStatus == true ? "distribution" : "simulation") + " now?").then(() => {

                // Cleans up the batch array.
                this.myBatchArray = [];

                // Bondpoolers distribution.
                if (this.doBondPoolPayments == true)
                {
                    if (this.bondpoolers != null)
                    {
                        // Iterates over the bondpoolers list to calculate values that will be added to the transaction. 
                        for (var p=0;p<this.bondpoolers.length;p++)
                        {
                            // Main calculations (done for each bondpooler).
                            let bondpooler = this.bondpoolers[p];
                            let amount = Math.round(((((this.totalRewards - (this.computedTotalDelegatorsActual * ONE_MILLION))) * bondpooler.memberShare) / 100) - ((((this.totalRewards - (this.computedTotalDelegatorsActual * ONE_MILLION))) * bondpooler.memberShare) / 100) * (bondpooler.memberFee/100));

                            let bondpoolElement = {
                                            kind: OpKind.TRANSACTION, 
                                            to: bondpooler.memberAddress, 
                                            amount: amount,
                                            mutez: true
                                        }; 

                            // Compounds the batch array that will be sent to the connected wallet.
                            this.myBatchArray.push(bondpoolElement);
                        }
                    }
                }
                // End of Bondpoolers distribution.

                // Iterates over the delegators list to calculate values that will be added to the transaction. 
                for (var k=0;k<this.totalDelegators;k++)
                {
                    // Main calculations (done for each delegator).
                    let delegator = this.delegators[k];
                    let sharePercent = (delegator.balance / this.stakingBalance);
                    let shareValue = (this.totalRewards * sharePercent);
                    let delegatorFeePercent = (this.feeArray[k].fee/100);
                    let delegatorFeeValue = (shareValue * delegatorFeePercent);
                    let shareValueAfterFee = Math.round((shareValue - delegatorFeeValue));
 
                    // Only adds to batch array IF "Pay?" checkbox is enabled (user filters).
                    if (this.payoutArray[k].value == true)
                    {
                        let element = {
                                        kind: OpKind.TRANSACTION, 
                                        to: delegator.address, 
                                        amount: shareValueAfterFee, 
                                        mutez: true  
                                      }; 

                        // Compounds the batch array that will be sent to the connected wallet.
                        this.myBatchArray.push(element);

                    }
                }

                // Sends the batch operation.
                this.sendBatch(this.myBatchArray)
                });
            }
            else
            {
                this.$alert("Please configure baker on SETTINGS first!");
            }
            
       },
       // Sends a batch array to the configured wallet.
       async sendBatch(myBatchArray) 
       {
           if (this.tapsStatus)
           {

               try
               {

                    const batch = this.Tezos.wallet.batch(myBatchArray);
                    const batchOp = await batch.send();
                    console.log('Batch operation hash : ', batchOp.hash);
                    await batchOp.confirmation(1); // The parameter is the number of confirmations to wait for.
 
                    this.$fire({
                    title: "Batch Sent!",
                    text: "Wallet confirmed successful operation",
                    type: "success",
                    timer: 5000
                    }).then(r => {
                    console.log(r.value);
                    })

                }
                catch(error)
                {
                   console.log(error);
                   
                    this.$fire({
                    title: "Operation canceled",
                    text: "Wallet returned an error",
                    type: "error",
                    timer: 10000
                    }).then(r => {
                    console.log(r.value);
                    })
                    
                }
           }
           else
           {
                // Builds contents for the PDF file.

                const doc = new jsPDF();
                doc.setFontSize(38);
                doc.text(30, 30, "TAPS");
                doc.setFontSize(10);
                doc.text(30, 35, "  Tezos Automatic Payment System");
                doc.setFontSize(8);
                doc.text(30, 40, "   A tool for bakers");
                doc.setFontSize(12);
                doc.text(68, 70, "SIMULATION REPORT FOR CYCLE " + this.payoutCycle);

                doc.setFontSize(10);
                doc.setFont("courier");

                let currentPage = 1;
                let delegatorsSum = 0;
                let bondpoolersSum = 0;
                let text = '';
                let offsetY = 90;

                for (var v=0;v<myBatchArray.length;v++)
                {
                    text = '';
                    let amount = myBatchArray[v].amount;

                    if (this.doBondPoolPayments === true)
                    {
                        if (this.bondpoolers != null)
                        {
                            if (v<this.bondpoolers.length)
                            {
                                bondpoolersSum = bondpoolersSum + amount;
                            }
                            else
                            {
                                delegatorsSum = delegatorsSum + amount;    
                            }
                        }
                    }
                    else
                    {
                        delegatorsSum = delegatorsSum + amount;
                    }

                    let amountString = (amount / (ONE_MILLION)).toFixed(6).toString();
                    let amountLen = amountString.length;
                    let recipient = myBatchArray[v].to;
                    let spaces = 20 - amountLen;
                    let mySpaceString = Array(spaces).join(" ");
                    text = text + recipient + mySpaceString + amountString + "tz \n";
                    mySpaceString = [];

                    if (this.doBondPoolPayments === true)
                    {
                        if (this.bondpoolers != null)
                        {
                            if ((v == this.bondpoolers.length)&&(this.bondpoolers.length > 0))
                            {
                                doc.text(50, offsetY, "----------------------------------------------------------------------");
                                offsetY += 5;
                            }
                        }
                    }

                    doc.text(50, offsetY, text + "\n");


                    text = '';
                    offsetY += 5;

                    if (currentPage == 1)
                    {
                        if (offsetY > 260)
                        {
                            doc.addPage();
                            offsetY = 30;
                            currentPage++;
                        }
                    }
                    else
                    {
                        if (offsetY > 270)
                        {
                            doc.addPage();
                            offsetY = 30;
                            currentPage++;
                        }
                    }


                }
                text = text + "\n\n";
                text = text + "   ----------------------------------------------------------------------\n";
     
                if (this.bondpoolers != null)
                {
                    if ((this.doBondPoolPayments === true)&&(this.bondpoolers.length > 0))
                    {
                        let amountString = (bondpoolersSum / (ONE_MILLION)).toFixed(6).toString();
                        let amountLen = amountString.length;
                        let spaces = 20 - amountLen;
                        let mySpaceString = Array(spaces).join(" ");
                        text = text + "                          Bondpoolers total : " + mySpaceString + amountString + "tz \n";
                        amountString = (delegatorsSum / (ONE_MILLION)).toFixed(6).toString();
                        amountLen = amountString.length;
                        spaces = 20 - amountLen;
                        mySpaceString = Array(spaces).join(" ");
                        text = text + "                          Delegators total  : " + mySpaceString + amountString + "tz \n";
                    }
                }
                    let amountString = ((bondpoolersSum / (ONE_MILLION)) + (delegatorsSum / (ONE_MILLION))).toFixed(6).toString();
                    let amountLen = amountString.length;
                    let spaces = 20 - amountLen;
                    let mySpaceString = Array(spaces).join(" ");
                    text = text + "                          Total sum         : " + mySpaceString + amountString + "tz \n";

                    doc.text(30, offsetY, text);
 
                
                let filename = "taps_simulation_cycle_" + this.payoutCycle + ".pdf" 

                doc.save(filename);
           }

        },
        // Creates a batch transaction based on a custom CSV file upon user request.
        createCustomCsvBatchTransaction() 
        {

            // Asks for user's confirmation.
            this.$confirm("Confirm sending of custom CSV Batch now?").then(() => {
    
            // Cleans up the batch array.
            this.myBatchArray = [];

            // Iterates over the recipients to be added to the transaction.
            for (var r=0;r<this.parsedCsv.length;r++)
            {            
                let element = {
                                kind: OpKind.TRANSACTION, 
                                to: this.parsedCsv[r][0], 
                                amount: this.parsedCsv[r][1], 
                                mutez: true  
                                }; 


                // Compounds the batch array that will be sent to the connected wallet.
                this.myBatchArray.push(element);

            }
  
            // Sends the batch operation.
            this.sendCustomCsvBatch(this.myBatchArray);

            });
            
       },
       // Sends a batch array based on a custom CSV file to the configured wallet.
       async sendCustomCsvBatch(myBatchArray) 
       {

            try
            {

                const batch = this.Tezos.wallet.batch(myBatchArray);
                const batchOp = await batch.send();
                console.log('Batch operation hash : ', batchOp.hash);
                await batchOp.confirmation(1); // The parameter is the number of confirmations to wait for.

                this.$fire({
                title: "Batch Sent!",
                text: "Wallet confirmed successful operation",
                type: "success",
                timer: 5000
                }).then(r => {
                console.log(r.value);
                })

            }
            catch(error)
            {
                console.log(error);
                
                this.$fire({
                title: "Operation canceled",
                text: "Wallet returned an error",
                type: "error",
                timer: 10000
                }).then(r => {
                console.log(r.value);
                })
                
            }
        },
        // Initializes arrays.
        initializeArrays()
        {
            // Empties the arrays.
            this.errors = [];
            this.feeArray = [];
            this.payoutArray = [];
        },
        // Checks if user has changed baking fee on SETTINGS.
        checkChangedBakingFee()
        {
            let element = null;
            let storedFee = localStorage.getItem('tapsConfiguredDelegatorFee');
            if (this.configuredDelegatorFee != storedFee)
            {
                // Replaces all delegators fees with new value.
                for (var n=0;n<this.totalDelegators;n++) 
                {
                    element = { fee: this.configuredDelegatorFee };
                    this.feeArray.push(element);
                }
            }
            // Overwrites the stored fee array with the new one.
            localStorage.setItem("tapsFeeArray", JSON.stringify(this.feeArray));
            localStorage.setItem('tapsConfiguredDelegatorFee', this.configuredDelegatorFee);

        },        
        // Customizes the delegators list according to user's settings.
        applyConfiguredFilters() 
        {
            var element;
            var actualAmount = 0;

            // Checks if the fee array exists already on localStorage.
            let storedFeeArray = JSON.parse(localStorage.getItem("tapsFeeArray"));

            // If it is null or empty, it must be built.
            if ((storedFeeArray == null) || (storedFeeArray.length == 0))
            {
                for (var n=0;n<this.totalDelegators;n++) 
                {
                    element = { fee: this.configuredDelegatorFee };
                    this.feeArray.push(element);
                }
            }
            else
            {
                // Gets the previously stored fee array.
                this.feeArray = JSON.parse(localStorage.getItem("tapsFeeArray"));
            }


            // Toggles "Pay?" checkboxes according to rules defined on settings.
            for (var m=0;m<this.totalDelegators;m++) 
            {

                    // Calculates the ACTUAL rewards amount that a delegator will receive.
                    actualAmount = (((this.totalRewards / ONE_MILLION) * (this.delegators[m].balance / this.stakingBalance))) - (((this.totalRewards / ONE_MILLION) * (this.delegators[m].balance / this.stakingBalance) * (this.feeArray[m].fee/100)));

                    // Checks if the delegator's balance is greater then the required minimum amount for payouts (user configured).
                    // Also checks if the ACTUAL rewards amount to be transfered is greater than the minimum configured on SETTINGS. 
                    if (  (this.delegators[m].balance > (this.configuredMinAcceptedDelegatedAmount * ONE_MILLION)) &&
                        (actualAmount * ONE_MILLION > this.configuredMinTransactionAmount * ONE_MILLION)
                    )
                    {
                        element = { value: true };
                        this.payoutArray.push(element);
                    }
                    else
                    {
                        element = { value: false };
                        this.payoutArray.push(element);
                    }
                
            }

        },
        validateConfiguredBakerId(value)
        {
            if (value.length == 0)
            {
                this.msg['configuredBakerId'] = '';
            }
            else if (value.length != 36)
            {
                this.msg['configuredBakerId'] = 'Invalid address';
            } 
            else if ((value.toLowerCase().substr(0,2) != 'tz') && (value.toLowerCase().substr(0,2) != 'kt') )
            {
                this.msg['configuredBakerId'] = 'Invalid address';
            }
            else 
            {
                this.msg['configuredBakerId'] = '';
            }
        },
        validateConfiguredRpcProvider(value)
        {
            if (value.length == 0) 
            {
                this.msg['configuredRpcProvider'] = 'Required';
            }
            else if (value.toLowerCase().substr(0,4) != 'http')
            {
                this.msg['configuredRpcProvider'] = 'Invalid Address';
            }
            else 
            {
                this.msg['configuredRpcProvider'] = '';
            }
        },
        validateBondpoolerAddress(value)
        {

            if (value.length == 0)
            {
                this.msg['memberAddress'] = 'Invalid address';
            }
            else if (value.length != 36)
            {
                this.msg['memberAddress'] = 'Invalid address';
            }
            else if ((value.toLowerCase().substr(0,2) != 'tz') && (value.toLowerCase().substr(0,2) != 'kt') )
            {
                this.msg['memberAddress'] = 'Invalid address';
            }
            else if (value.toLowerCase() == this.configuredBakerId.toLowerCase())
            {
                this.msg['memberAddress'] = 'same baker address';
            }
            else if (this.memberExists(value.toLowerCase()) == true)
            {
                this.msg['memberAddress'] = 'repeated address';
            }
            else 
            {
                this.msg['memberAddress'] = '';
            }
        },
        validateBondpoolerAmount(value)
        {
            if (value.length == 0)
            {
                this.msg['memberAmount'] = 'Invalid amount';
            }
            else if (value == 0)
            {
                this.msg['memberAmount'] = 'Invalid amount';
            }
            else if (this.bondpoolOverflow(value) == true)
            {
                this.msg['memberAmount'] = 'Amount overflow';
            }
            else 
            {
                this.msg['memberAmount'] = '';
            }
        },
        validateBondpoolerFee(value)
        {

            if (value.length == 0)
            {
                this.msg['memberFee'] = 'Invalid fee';
            }
            else if (parseFloat(value) > 100)
            {
                this.msg['memberFee'] = 'Invalid percentage';
            }
            else 
            {
                this.msg['memberFee'] = '';
            }
        },
        validateBondpoolerName(value)
        {
            if ((value.length == 0)||(value.trim() == ''))
            {
                this.msg['memberName'] = 'Invalid name';
            }
            else 
            {
                this.msg['memberName'] = '';
            }
        },
        doFactoryReset()
        {

            // Asks for user's confirmation.
            this.$confirm("This will delete all saved configuration data and disconnect. Do you really want to proceed?",'','warning').then(() => {

                // Cleans up memory variables.
                this.resetSettings();

                // Deletes saved data from local storage.
                localStorage.removeItem('tapsStatus');
                localStorage.removeItem('tapsConfiguredBakerID');
                localStorage.removeItem('tapsConfiguredRpcProvider');
                localStorage.removeItem('tapsConfiguredDelegatorFee');
                localStorage.removeItem('tapsConfiguredMinAcceptedDelegatedAmount');
                localStorage.removeItem('tapsConfiguredMinTransactionAmount');
                localStorage.removeItem("tapsFeeArray");
                localStorage.removeItem("tapsPayoutArray");
                localStorage.removeItem("tapsBondpoolersArray");
                localStorage.removeItem("tapsDoBondPoolPayments");

                // Exits.
                this.disconnect();
            });
        },
        isNumber: function(evt)
        {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) 
            {
                evt.preventDefault();
            } 
            else 
            {
                return true;
            }
        },
        isAlphaNumeric: function(evt)
        {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ( charCode > 31 )
            {
                if (charCode > 47 && charCode < 58)
                {
                    return true;
                }

                if (charCode > 64 && charCode < 91)
                {
                    return true;
                } 
                
                if (charCode > 96 && charCode < 123)
                {
                    return true;
                }
            }

            // If all fails...
            evt.preventDefault();
        },
        isValidPercentage: function(evt, value, index)
        {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) 
            {
                evt.preventDefault();
            } 
            else 
            {
                if ((value >= 0) && (value <= 100))
                {
                    return true;
                }
                else
                {
                    this.$fire(
                    {
                        title: "Invalid fee",
                        type: "error",
                        timer: 3000
                    });

                    this.bondpoolers[index].memberFee = 0;
                    return false;
                }
            }
        },
        processMemberAmount(evt, index)
        {

            this.previousMemberAmount = this.bondpoolers[index].memberAmount;
            evt.target.select();

        },
        isValidAmount: function(evt, value, index)
        {

            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) 
            {
                evt.preventDefault();
            } 
            else 
            {

                if (this.bondpoolOverflow(value) == true)
                {
                    this.$fire(
                    {
                        title: "Sum would be higher than total pool value",
                        type: "error",
                        timer: 3000
                    });

                    this.bondpoolers[index].memberAmount = this.previousMemberAmount;
                    this.previousMemberAmount = "";
                    return false;

                }
                else if (value > 0)
                {
                    return true;
                }
                else
                {
                    this.$fire(
                    {
                        title: "Amount should be higher than zero",
                        type: "error",
                        timer: 3000
                    });

                    this.bondpoolers[index].memberAmount = value;

                    this.$refs.myMemberAmountInput.focus(); 
                    return false;
                }
            }
        },
        isValidName: function(evt, value)
        {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode == 32)
            {
                evt.preventDefault();
            } 
            else 
            {
                if (value.length > 0)
                {
                    return true;
                }
                else
                {
                    this.$fire(
                    {
                        title: "Invalid name",
                        type: "error",
                        timer: 3000
                    });

                    return false;
                }
            }
        },        
        readFile() 
        {
            this.myCsvFile = this.$refs.doc.files[0];
            const reader = new FileReader();
            if (this.myCsvFile.name.includes(".csv") || this.myCsvFile.name.includes(".txt")) 
            {
                reader.onload = (res) => 
                {
                    this.fileContent = res.target.result;
                    this.parsedCsv = this.$papa.parse(this.fileContent, { delimiter: ",", skipEmptyLines: true }).data;
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.myCsvFile);
            } 
            else 
            {
                this.$alert("Could not open CSV file");
            }
        },
        scrollToBottom() 
        {
            const scrollingElement = (document.scrollingElement || document.body);
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        },
        addBondPoolMember()
        { 
            // Validates bondpooler member address.
            if (this.msg['memberAddress'] == null)
            {
                this.$alert("All fields are mandatory");
                return false;
            }

            if (this.msg['memberAddress'].toLowerCase() == 'invalid address')
            {
                this.$alert("Please provide a valid Tezos address");
                return false;
            }

            if (this.msg['memberAddress'].toLowerCase() == 'same baker address')
            {
                this.$alert("By default baker is already a member of bond pool");
                return false;
            }

            if (this.msg['memberAddress'].toLowerCase() == 'repeated address')
            {
                this.$alert("Address is already member of bond pool");
                return false;
            }

            // Validates bondpooler member amount.
            if (this.msg['memberAmount'] == null)
            {
                this.$alert("All fields are mandatory");
                return false;
            }

            if (this.msg['memberAmount'].toLowerCase() == 'invalid amount')
            {
                this.$alert("Amount must be higher than zero");
                return false;
            }

            if (this.msg['memberAmount'].toLowerCase() == 'amount overflow')
            {
                this.$alert("Sum would be higher than total pool value");
                return false;
            }


            // Validates bondpooler member fee.
            if (this.msg['memberFee'] == null)
            {
                this.$alert("All fields are mandatory");
                return false;
            }

            if (this.msg['memberFee'].toLowerCase() == 'invalid fee')
            {
                this.$alert("Invalid fee");
                return false;
            }

            if (this.msg['memberFee'].toLowerCase() == 'invalid percentage')
            {
                this.$alert("Fee must be between 0 and 100");
                return false;
            }

            // Validates bondpooler member name.
            if (this.msg['memberName'] == null)
            {
                this.$alert("All fields are mandatory");
                return false;
            }

            if (this.msg['memberName'].toLowerCase() == 'invalid name')
            {
                this.$alert("Invalid name");
                return false;
            }

            this.memberAmount = parseFloat(this.memberAmount);
            this.memberShare = (this.memberAmount / this.bakerBalance) * 100;

            var newMember = 
            {
                memberAddress:this.memberAddress,
                memberAmount:this.memberAmount,
                memberShare:this.memberShare,
                memberFee:this.memberFee,
                memberName: this.memberName
            };

            if (this.bondpoolers != null)
            {
                this.bondpoolers.push(newMember);
            }

            this.saveSettings();

            this.memberAddress = '';
            this.memberAmount = '';
            this.memberShare = '';
            this.memberFee = '';
            this.memberName = '';
            this.msg = [];

        },
        memberExists(newMemberAddress)
        {
            var found = false;

            if (this.bondpoolers != null)
            {
                for (var i=0;i<this.bondpoolers.length;i++)
                {
                    if (this.bondpoolers[i].memberAddress.toLowerCase() == newMemberAddress)
                    {
                        found = true;
                        break;
                    }
                } 
            }

            return found;

        },
        bondpoolOverflow(newValue)
        {
            var overflow = false;
            var sum = 0.00;

            if (this.bondpoolers != null)
            {
                for (var i=0;i<this.bondpoolers.length;i++)
                {
                    sum = sum + parseFloat(this.bondpoolers[i].memberAmount);
                }

                if ((sum + parseFloat(newValue)) > parseFloat(this.bakerBalance))
                {
                    overflow = true;
                }
                else
                {
                    overflow = false;
                }
            }

            return overflow;

        },
        toggleBondPoolPayments()
        {
            this.doBondPoolPayments = !this.doBondPoolPayments;
            this.saveSettings();
        },
        removeBondPoolMember(index)
        {
            // Asks for user's confirmation.
            this.$confirm("Remove " + this.bondpoolers[index].memberName + " from bond pool?").then(() => {
               if (this.bondpoolers != null)
               {
                   this.bondpoolers.splice(index, 1);
               }
               this.saveSettings();
            });
        },
        getProposalsData(baseArray)
        {

            for (var v=0;v<baseArray.length;v++)
            {
                if (baseArray[v].status === "active")
                {
                    let element = 
                    {
                        alias: baseArray[v].metadata == null ? "" : baseArray[v].metadata.alias, 
                        hash: baseArray[v].hash, 
                        status: baseArray[v].status,
                        kind: baseArray[v].kind,
                        startTime: baseArray[v].startTime,
                        endTime: baseArray[v].endTime,
                        myVoteCommand: ""
                    }; 

                    this.proposals.push(element);
                }
            }
        },
        getCurrentGovernancePeriod(data)
        {
            this.currentProposalStartTime = data.startTime;
            this.currentProposalEndTime = data.endTime;
            this.currentProposalKind = data.kind;
            this.currentProposalStatus = data.status;
        },
        capitalizeFirstLetter(phrase)
        {
            if (phrase == null)
                return "";

            if (phrase.length > 0)
            {
                return phrase.charAt(0).toUpperCase() + phrase.slice(1);
            }
            else
            {
                return "";
            }
        },
        dateBackFrom(date)
        {
            if (date == null)
                return "";

            if (date.length > 0)
            {
                return formatDistance(parseISO(date), new Date, { addSuffix: true} );
            }
            else
                return "";
        },
        dateForwardTo(date)
        {
            if (date == null)
                return "";

            if (date.length > 0)
            {
                return formatDistance(parseISO(date), new Date, { addSuffix: true} );
            }
            else
                return "";
        },
        vote(delegate, hash, voteCast, period, index)
        {
            var message = "";

            if (period == "proposal")
            {
                message = "Confirm vote for this governance proposal?";
            }
            else
            {
                message = "Confirm vote '" + voteCast + "' for this governance proposal?";
            }

            // Asks for user's confirmation.
            this.$confirm(message).then(() => {

            if (period == "proposal")
            {
                this.proposals[index].myVoteCommand = './tezos-client submit proposals for ' + delegate + ' ' + hash;
            }
            else
            {
                this.proposals[index].myVoteCommand = './tezos-client submit ballot for ' + delegate + ' ' + hash + ' ' + voteCast;
            }

            });
        },
        onCopy()
        {
            this.$fire(
            {
                title: "Copied!",
                text: "Now paste on your node's command line to vote",
                type: "success",
                timer: 10000
            });
        },
        onError()
        {
            this.$fire(
            {
                title: "Error",
                text: "Could not copy to clipboard",
                type: "error",
                timer: 5000
            });
        }

    },
    updated ()
    {
        if (this.menuop === "csvbatch" && this.parsedCsv != null)
        {
            this.scrollToBottom();
        }

    },
    mounted () 
    {
        // Code run when page loads/refreshes.

        try
        {
            // Gets the current Tezos blockchain cycle.
            axios
                .get(GET_TEZOS_HEAD_URL)
                .then(response => ( 
                                    this.currentCycle = response.data.cycle,
                                    this.payoutCycle == 0 ? this.payoutCycle = this.currentCycle - 6 : this.payoutCycle)
                                   )
                .catch(error => { console.log(error) })
        }
        catch(error)
        {
            console.log(error);
        }

        // Gets list of Tezos governance proposals.
        axios
            .get(GET_PROPOSALS_LIST_URL)
            .then(response => ( 
                                this.getProposalsData(response.data)
                            ))
            .catch(error => { console.log(error) });

        // Gets current Tezos governance period.
        axios
            .get(GET_PROPOSALS_CURRENT_URL)
            .then(response => ( 
                                this.getCurrentGovernancePeriod(response.data)
                            ))
            .catch(error => { console.log(error) });


        // Checks if wallet is already instantiated. If not, creates it, without connecting.
        this.initWallet(false);

        // Changes DISTRIBUTE button caption according to status.
        this.toggleStatus();

        // Checks if device is mobile.
        if( screen.width > 820 )
        {
            this.isMobile = false;
        }
        else
        {
            this.isMobile = true;
        }

    },
    filters: 
    {
        // Displays mutez amount as decimal.
        formatTez: function (mutez) 
        {
            return numeral(mutez).format("0,000.000000"); 
        },
        // Displays value as percentage.
        formatPercentage: function (value) 
        {
            return numeral(value).format("0.00"); 
        }
   },

   computed: 
   {
        // Formats the way that data is presented to the user.
        rewardsPendingCycle: function() 
        {
            return this.currentCycle - 6
        },
        computedUnavailable: function() 
        {
            return this.UNAVAILABLE_MESSAGE;
        },
        computedTotalSumCsv: function()
        {
            if (this.parsedCsv != null)
            {
                let sum = 0;
                this.parsedCsv.forEach(function(item)
                        {
                        sum += parseInt(item[1]);
                        });

                return sum;
            }
            else
                return "";
        },
        computedTotalDelegatorsRewards: function()
        {
            if (this.delegators != null)
            {
                if (this.delegators.length > 0)
                {
                    let sum = 0;
                    for (var k=0;k<this.totalDelegators;k++)
                    {
                        // Main calculations (done for each delegator).
                        let delegator = this.delegators[k];
                        let sharePercent = (delegator.balance / this.stakingBalance);
                        let shareValue = (this.totalRewards * sharePercent);
        
                        if (this.payoutArray[k].value == true)
                        {
                            sum = sum + shareValue;
                        }
                    }

                    return (sum / ONE_MILLION);
                }
                else
                return "";

            }
            else
                return "";
        },
        computedTotalDelegatorsActual: function()
        {

            if (this.delegators != null)
            {
                if (this.delegators.length > 0)
                {
                    let sum = 0;
                    for (var k=0;k<this.totalDelegators;k++)
                    {
                        // Main calculations (done for each delegator).
                        let delegator = this.delegators[k];
                        let sharePercent = (delegator.balance / this.stakingBalance);
                        let shareValue = (this.totalRewards * sharePercent);
                        let delegatorFeePercent = (this.feeArray[k].fee/100);
                        let delegatorFeeValue = (shareValue * delegatorFeePercent);
                        let shareValueAfterFee = Math.round(shareValue - delegatorFeeValue);

                        if (this.payoutArray[k].value == true)
                        {
                            sum = sum + shareValueAfterFee;
                        }
                    }

                    return (sum / ONE_MILLION);
                }
                else
                    return "";

            }
            else
                return "";
        },
        computedBondPoolersTotalBalance: function()
        {
            if (this.bondpoolers != null)
            {
                let sum = 0;
                for (var k=0;k<this.bondpoolers.length;k++)
                {
                    sum += parseFloat(this.bondpoolers[k].memberAmount);
                }
                
                return sum;
            
            }
            else
                return "";
        },
        computedBakerPoolShare: function()
        {
            if (this.bondpoolers != null)
            {
                let sum = 0;
                for (var k=0;k<this.bondpoolers.length;k++)
                {
                    sum = sum + this.bondpoolers[k].memberShare;
                }
 
                return (100 - sum);
            
            }
            else
                return "";
            
        },
        computedPoolTotalBalance: function()
        {
            return this.bakerBalance;
        },
        computedPoolTotalShare: function()
        {
            if (this.bondpoolers != null)
            {
                let sum = 0;
                for (var k=0;k<this.bondpoolers.length;k++)
                {
                    sum = sum + this.bondpoolers[k].memberShare;
                }
 
                return sum;
            
            }
            else
                return "";
            
        },
        computedPoolTotalEarnings: function()
        {
            if (this.bondpoolers != null)
            {
                let sum = 0;
                for (var k=0;k<this.bondpoolers.length;k++)
                {
                    sum = sum + ((((this.totalRewards - (this.computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * this.bondpoolers[k].memberShare) / 100;
                }

                return sum;
            
            }
            else
            return "";
        },
        computedPoolActualEarnings: function()
        {
            if (this.bondpoolers != null)
            {
                let sum = 0;
                let bakerEarnings = ((((this.totalRewards - (this.computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * this.computedBakerPoolShare) / 100;
                for (var m=0;m<this.bondpoolers.length;m++)
                {
                    if (this.bondpoolers[m].memberAddress != this.configuredBakerId)
                    {
                        let earnings = ((((this.totalRewards - (this.computedTotalDelegatorsActual * ONE_MILLION)) / ONE_MILLION)) * this.bondpoolers[m].memberShare) / 100;
                        sum = sum + (earnings - ((earnings * this.bondpoolers[m].memberFee)/100));
                    }
                }

                return (sum - bakerEarnings);
            
            }
            else
            return "";
        }


    },
    watch: 
    {
        configuredBakerId(value)
        {
            this.configuredBakerId = value;
            this.validateConfiguredBakerId(value);
        },
        configuredRpcProvider(value)
        {
            this.configuredRpcProvider = value;
            this.validateConfiguredRpcProvider(value);

            if (this.Tezos)
            {

                // Checks if RPC provider is online
                if (this.configuredRpcProvider)
                {

                    try
                    {

                        axios
                            .get( (this.configuredRpcProvider + CHECK_RPC_ONLINE_SUFFIX).replace(/\/\/+/g, '/') )
                            // eslint-disable-next-line no-unused-vars
                            .then(response => ( this.isRpcProviderOnline = true ) )
                            // eslint-disable-next-line no-unused-vars
                            .catch(error => { this.isRpcProviderOnline = false, this.configuredRpcProvider = this.alternativeRpcProvider })
                    
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                    finally
                    {
                        this.Tezos.setProvider({ rpc: this.configuredRpcProvider });
                    }
                }
            }

        },
        memberAddress(value)
        {
            this.memberAddress = value;
            this.validateBondpoolerAddress(value);
        },
        memberAmount(value)
        {
            this.memberAmount = value;
            this.validateBondpoolerAmount(value);
        },
        memberFee(value)
        {
            this.memberFee = value;
            this.validateBondpoolerFee(value);
        },
        memberName(value)
        {
            this.memberName = value;
            this.validateBondpoolerName(value);
        }

    }

}
</script>

// CSS styles.
<style>
    html {
        margin-left: calc(100vw - 100%);
        margin-right: 0;    
    }

   .deliveredRewardsBackground {
        background-color:#dff0d8;
        line-height:30px;
        text-align: center;
        display:inline;
        font-weight: 100;
        border-bottom: solid 1px lightgray;
   }

   .pendingRewardsBackground {
        background-color:#fcf8e3;
        line-height:30px;
        text-align: center;
        display:inline;
        font-weight: 100;
        border-bottom: solid 1px lightgray;
   }

   .cycleInProgressBackground {
        background-color:#d9edf7;
        line-height:30px;
        text-align: center;
        display:inline;
        font-weight: 100;
        border-bottom: solid 1px lightgray;
    }

   .cyclePendingBackground {
        background-color:#f0f0f0;
        line-height:30px;
        text-align: center;
        display:inline;
        font-weight: 100;
        border-bottom: solid 1px lightgray;
    }

   .head-div-taps {
        font-family:'Muli-black', sans-serif;
        font-weight: 800 !important;
        background-color:#08090c !important; 
        color:#c5a87c;
        line-height:48px;
        text-align: center;
   }

    .delegatorsIndexClass {
        background-color:white;
        line-height:48px;
        font-size: 0.9em;
        font-weight: 100;        
    }

    .delegatorsAddressClass {
        background-color:white;
        line-height:48px;
        font-size: 0.9em;
        font-weight: 100;        
    }

    .delegatorsNumbersClass {
        background-color:white;
        line-height:48px;
        font-size: 0.9em;
        font-weight: 100;
        
    }

    .borderTop {
        border-top: solid 1px lightgray;
    }

    .colCentered {
        float: none;
        margin: 0 auto;
    }

    .roundedCorners {
        vertical-align: middle;
        line-height:100px;
        border-radius: 35px;
        background: #c8b08b;
        padding: 20px;
        color:white;
        font-family: Verdana, sans-serif;
        font-weight: bold;
        text-align:center;
        width:auto;
    }

    .roundedCornersMobile {
        vertical-align: middle;
        line-height:40px;
        border-radius: 30px;
        background: #c8b08b;
        padding: 8px;
        color:white;
        font-family: Verdana, sans-serif;
        font-weight: bold;
        font-size: 12px;
        text-align:center;
        width:auto;
    }

    .balance {
        vertical-align: middle;
        line-height:100px;
        padding:0px;
        color: white;
        font-family: Verdana, sans-serif;
        font-weight: bold;
        text-align:center;
        width:auto;
    }

    .filter-white {
        filter:  brightness(0) invert(1);
    }

    .clickable {
        cursor: pointer;
    }

    .dashboard-title {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-weight:bold;
        color:#868079;
    }

    .title-mobile {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-weight:bold;
        font-size: 12px;
        color:#868079;
        width:200px;
    }

    .data-mobile {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-weight:normal;
        font-size: 12px;
        padding-left: 5px;
        color:black;
    }


    .errorRequired{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bold;
        font-style: italic; 
        font-size: 14px;
        color:red;
    }

 /* Style the navigation menu */
.topnav {
  overflow: hidden;
  background-color: black;
  position: absolute;
  top: 10px;
  right:0px;
  width: 100%;
  height:55px;
  z-index:20;
  padding:20px;
}

/* Hide the links inside the navigation menu (except for logo/home) */
.topnav #myLinks
 {
   display: none;
 }

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 12px;
  display: block;
  text-align: right;
  margin-left:220px;
}

/* Style the hamburger menu */
.topnav a.icon {
    color: #c5a87c;
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  font-size:17px;
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04AA6D;
  color: white;
} 

</style>

