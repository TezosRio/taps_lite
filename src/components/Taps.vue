<template>
<div class="container">
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
                    <h4>(in rewards-pending cycle {{currentCycle - 5}})</h4>
                    <div id="form-todo form-group" style="width:955px;">
                        <table class="table table-taps-alt">
                            <thead class="head-table-taps">
                                <tr>
                                    <th style="text-align:center;" scope="col">#</th>
                                    <th style="text-align:center;" scope="col">Delegator</th>
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
</template>

<script>

// Imports.
import axios from 'axios'
import numeral from 'numeral';
import { TezosToolkit, OpKind } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import jsPDF from 'jspdf';

// Constants.
const ONE_MILLION = 1000000;
const TEZ_SYMBOL = 'ꜩ';
const GET_TEZOS_HEAD_URL = 'https://api.tzkt.io/v1/head';
const GET_TEZOS_REWARDS_SPLIT_URL = 'https://api.tzkt.io/v1/rewards/split/';
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
            // User configured values.
            configuredRpcProvider: TEZOS_RPC_PROVIDER_01,
            configuredDelegatorFee: '10',
            configuredMinAcceptedDelegatedAmount: '0.01',
            configuredMinTransactionAmount: '0.0001',
            configuredBakerId: '',            
            // Flow control variables.
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
            stakingBalance: 0,
            totalRewards: 0,
            totalDelegators: 0,
            // Data structures.
            delegators: [],
            feeArray: [],
            payoutArray: [],
            myBatchArray: [],
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
                aqueduct: require('@/assets/imgs/aqueduct.jpg')
            }
        };
    },  
    methods:
    {
        // Specifies which page will be shown upon user menu selection.
        setMenuOption(option) 
        {
            this.menuop = option;
        },
        // Bring back default values to configuration.
        resetSettings() 
        {
            this.msg = [];
            this.feeArray = [];
            this.payoutArray = [];
            this.myBatchArray = [];
            this.delegators = [];            
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
        },
        // Bring back default values to configuration.
        cleanupSettings() 
        {
            this.msg = [];
            this.feeArray = [];
            this.payoutArray = [];
            this.myBatchArray = [];
            this.delegators = [];            
            this.tapsStatus = false;
            this.configuredBakerId = '';
            this.configuredRpcProvider = '',
            this.configuredDelegatorFee = '';
            this.configuredMinAcceptedDelegatedAmount = '';
            this.configuredMinTransactionAmount = '';
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
                                    axios
                                        .get(GET_TEZOS_REWARDS_SPLIT_URL + this.configuredBakerId + '/' + parseInt(this.currentCycle - 5) + '?limit=' + TEZOS_REWARDS_SPLIT_RESPONSE_LIMIT)
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
                                    this.bakerInfoFee = (response.data.fee * 100)
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

                // Iterates over the delegators list to calculate values that will be added to the transaction. 
                for (var k=0;k<this.totalDelegators;k++)
                {
                    // Main calculations (done for each delegator).
                    let delegator = this.delegators[k];
                    let sharePercent = (delegator.balance / this.stakingBalance);
                    let shareValue = (this.totalRewards * sharePercent);
                    let delegatorFeePercent = (this.feeArray[k].fee/100);
                    let delegatorFeeValue = (shareValue * delegatorFeePercent);
                    let shareValueAfterFee = Math.round(shareValue - delegatorFeeValue);

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
                var payoutCycle = this.currentCycle - 5;

                const doc = new jsPDF();
                doc.setFontSize(38);
                doc.text(30, 30, "TAPS");
                doc.setFontSize(10);
                doc.text(30, 35, "  Tezos Automatic Payment System");
                doc.setFontSize(8);
                doc.text(30, 40, "   A tool for bakers");
                doc.setFontSize(12);
                doc.text(68, 70, "SIMULATION REPORT FOR CYCLE " + payoutCycle);

                doc.setFontSize(10);
                doc.setFont("courier");
          
                let maxRowsPerPage = 50;
                let numPages = (Math.round(myBatchArray.length / maxRowsPerPage)) + 1;
                let currentPage = 1;
                let sum = 0;
                let text = '';
                let initRow = 0;
                let endRow = 0;
                let offsetY = 0;
                for (var v=1;v<=numPages;v++)
                {
                    text = '';
                    currentPage = v;
                    initRow = (maxRowsPerPage * v) - maxRowsPerPage;

                   if (v == 1)
                    {
                        endRow = maxRowsPerPage - 10;
                        offsetY = 90;
                    }
                    else
                    {
                        endRow = initRow + (maxRowsPerPage + 10);
                        offsetY = 30;
                    }
 
                    if (endRow > myBatchArray.length)
                    {
                        endRow = myBatchArray.length;
                    }

                    for (var g=initRow;g<endRow;g++)
                    {
                        let amount = myBatchArray[g].amount / (ONE_MILLION);
                        sum = sum + amount;
                        let amountLen = (amount.toString().length) + 2;
                        let recipient = myBatchArray[g].to;
                        let spaces = 20 - amountLen;
                        let mySpaceString = Array(spaces).join(" ");
                        text = text + recipient + mySpaceString + amount + "tz \n";
                        mySpaceString = [];
                    }
                    doc.text(50, offsetY, text + "\n");
                    text = '';

                    if (currentPage < numPages-1)
                        doc.addPage();
                    else if (currentPage == numPages)
                    {
                        text = text + "\n\n" + "                                    Total : " + sum + "tz";
                        doc.text(30, 250, text);
                    }

                }
                let filename = "taps_simulation_cycle_" + payoutCycle + ".pdf" 

                doc.save(filename);
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
                .then(response => ( this.currentCycle = response.data.cycle) )
                .catch(error => { console.log(error) })
        }
        catch(error)
        {
            console.log(error);
        }

        // Checks if wallet is already instantiated. If not, creates it, without connecting.
        this.initWallet(false);

        // Changes DISTRIBUTE button caption according to status.
        this.toggleStatus();

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
            return this.currentCycle - 5
        },
        computedUnavailable: function() 
        {
            return this.UNAVAILABLE_MESSAGE;
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

    .errorRequired{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bold;
        font-style: italic; 
        font-size: 14px;
        color:red;
    }

</style>