//
//   Copyright 2013 Sougata Sarkar
//
//   This file is part of Jobtracker.

//   Jobtracker is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
//   License as published by the Free Software Foundation, either version 3 of the License, or (at your option) 
//   any later version.
//
//   JobTracker is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the
//   implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
//   for more details.
//
//   You should have received a copy of the GNU General Public License along with Jobtracker. If not, 
//   see http://www.gnu.org/licenses/.
//


function listCustomers() {

    var customerList = Ext.create('jobtracker.view.customerlist', {
        renderTo: 'customerListPanel'
    });

    var customerStore = Ext.create('jobtracker.store.customerstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    customerStore.on("load", function (store, records, options) {

        // customerList.items.first().items.first().items.first() can be used to select the dataview,
        // like so:
        // customerList.items.first().items.first().items.first().itemSelector = 'div.customerSelectBox';
        // customerList.items.first().items.first().items.first().bindStore(customerStore);
        // 
        // or we can use the ComponentQuery object to locate elements, as is done here
        // you may override the tpl and itemSelector values here
        var customerListDataView = Ext.ComponentQuery.query('#customerListDataView')[0];
        customerListDataView.itemSelector = 'div.customerSelectBox';
        customerListDataView.bindStore(customerStore);
    });

    customerStore.load();

    return customerList;
}

function newCustomerButton() {
    var nb = Ext.create('Ext.Button', {
        text: 'Add a New Customer',
        scale: 'large',
        iconCls: 'newCustomerIcon',
        renderTo: 'newCustomerButton',
        handler: function () {
            this.fireEvent('newCustomer');
        }
    });

    return nb;
}

function createCustomerForm() {
    var cf = Ext.create('jobtracker.view.createcustomerform', {
        renderTo: 'createCustomerForm',
        hidden: true
    });

    var phoneType1 = Ext.ComponentQuery.query('#phoneType1')[0];
    var phoneType2 = Ext.ComponentQuery.query('#phoneType2')[0];
    var phoneType3 = Ext.ComponentQuery.query('#phoneType3')[0];
    var jobType = Ext.ComponentQuery.query('#jobType')[0];
    loadPhoneType(phoneType1);
    loadPhoneType(phoneType2);
    loadPhoneType(phoneType3);
    loadJobType(jobType);

    return cf;
}


function editCustomerForm() {
    var ef = Ext.create('jobtracker.view.editcustomerform', {
        renderTo: 'editCustomerForm',
        hidden: true
    });

    var phoneType1 = Ext.ComponentQuery.query('#ephoneType1')[0];
    var phoneType2 = Ext.ComponentQuery.query('#ephoneType2')[0];
    var phoneType3 = Ext.ComponentQuery.query('#ephoneType3')[0];
    var jobType = Ext.ComponentQuery.query('#ejobType')[0];
    loadPhoneType(phoneType1);
    loadPhoneType(phoneType2);
    loadPhoneType(phoneType3);
    loadJobType(jobType);

    return ef;
}


function loadPhoneType(pt) {
    var phoneTypeStore = Ext.create('jobtracker.store.phonetypestore', {
        autoLoad: false
    });

    // store's load is asynchronous
    phoneTypeStore.on("load", function (store, records, options) {
        pt.bindStore(phoneTypeStore);
    });

    phoneTypeStore.load();
}

function loadJobType(jt) {
    var jobTypeStore = Ext.create('jobtracker.store.jobtypestore', {
        autoLoad: false
    });

    // store's load is asynchronous
    jobTypeStore.on("load", function (store, records, options) {
        jt.bindStore(jobTypeStore);
    });

    jobTypeStore.load();    
}


function createCustomer(firstNameParam, lastNameParam, companyParam, address1Param, address2Param, cityParam, stateParam, zipParam, addressTypeParam, phone1Param, phone2Param, phone3Param, phoneType1Param, phoneType2Param, phoneType3Param, jobTypeParam) {
    
    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#createCustomerForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/CreateCustomerHandler.ashx',
        type: 'POST',
        data: {
            FirstName: firstNameParam,
            LastName: lastNameParam,
            Company: companyParam,
            Address1: address1Param,
            Address2: address2Param,
            City: cityParam,
            State: stateParam,
            Zip: zipParam,
            AddressTypeID: addressTypeParam,
            Phone1: phone1Param,
            Phone2: phone2Param,
            Phone3: phone3Param,
            PhoneTypeID1: phoneType1Param,
            PhoneTypeID2: phoneType2Param,
            PhoneTypeID3: phoneType3Param,
            JobType: jobTypeParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#createCustomerForm')[0].fireEvent('createCustomerFailed');
            }
            else {
                Ext.ComponentQuery.query('#createCustomerForm')[0].fireEvent('customerCreated', response);
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#createCustomerForm')[0].fireEvent('createCustomerFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}

function customerCreated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Customer created.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function createCustomerFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not create customer.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editCustomerFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not get customer details.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editCustomer(customerIDParam) {

    // get customer details
    jQuery.ajax({
        url: 'Dispatchers/XML/EditCustomerHandler.ashx',
        type: 'POST',
        data: {
            CustomerID: customerIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('editCustomerFailed');
            }
            else {
                var customerDetails = jQuery.xml2json(response);
                Ext.ComponentQuery.query('#ehCustomerID')[0].setValue(customerDetails.Customer.CustomerID);
                Ext.ComponentQuery.query('#ejobType')[0].setValue(customerDetails.Customer.JobTypeID);
                Ext.ComponentQuery.query('#efirstName')[0].setValue(customerDetails.Customer.FirstName);
                Ext.ComponentQuery.query('#elastName')[0].setValue(customerDetails.Customer.LastName);
                Ext.ComponentQuery.query('#ecompany')[0].setValue(customerDetails.Customer.Company);

                if (customerDetails.Customer.CustomerAddress) {
                    Ext.ComponentQuery.query('#eaddress1')[0].setValue(customerDetails.Customer.CustomerAddress.Address1);
                    Ext.ComponentQuery.query('#eaddress2')[0].setValue(customerDetails.Customer.CustomerAddress.Address2);
                    Ext.ComponentQuery.query('#ecity')[0].setValue(customerDetails.Customer.CustomerAddress.City);
                    Ext.ComponentQuery.query('#estate')[0].setValue(customerDetails.Customer.CustomerAddress.State);
                    Ext.ComponentQuery.query('#ezip')[0].setValue(customerDetails.Customer.CustomerAddress.Zip);
                }
                else {
                    Ext.ComponentQuery.query('#eaddress1')[0].setValue('');
                    Ext.ComponentQuery.query('#eaddress2')[0].setValue('');
                    Ext.ComponentQuery.query('#ecity')[0].setValue('');
                    Ext.ComponentQuery.query('#estate')[0].setValue('');
                    Ext.ComponentQuery.query('#ezip')[0].setValue('');
                }

                if (customerDetails.Customer.CustomerPhone) {
                    // if there is only one phone number, then the json object does not have an array of phone numbers, but rather
                    // just the one object
                    if (customerDetails.Customer.CustomerPhone[0]) {
                        Ext.ComponentQuery.query('#ephone1')[0].setValue(customerDetails.Customer.CustomerPhone[0].Phone);
                        Ext.ComponentQuery.query('#ephoneType1')[0].setValue(customerDetails.Customer.CustomerPhone[0].PhoneTypeID);
                    }
                    else {
                        Ext.ComponentQuery.query('#ephone1')[0].setValue(customerDetails.Customer.CustomerPhone.Phone);
                        Ext.ComponentQuery.query('#ephoneType1')[0].setValue(customerDetails.Customer.CustomerPhone.PhoneTypeID);
                    }

                    if (customerDetails.Customer.CustomerPhone[1]) {
                        Ext.ComponentQuery.query('#ephone2')[0].setValue(customerDetails.Customer.CustomerPhone[1].Phone);
                        Ext.ComponentQuery.query('#ephoneType2')[0].setValue(customerDetails.Customer.CustomerPhone[1].PhoneTypeID);
                    }
                    else {
                        Ext.ComponentQuery.query('#ephone2')[0].setValue('');
                        Ext.ComponentQuery.query('#ephoneType2')[0].setValue('');
                    }

                    if (customerDetails.Customer.CustomerPhone[2]) {
                        Ext.ComponentQuery.query('#ephone3')[0].setValue(customerDetails.Customer.CustomerPhone[2].Phone);
                        Ext.ComponentQuery.query('#ephoneType3')[0].setValue(customerDetails.Customer.CustomerPhone[2].PhoneTypeID);
                    }
                    else {
                        Ext.ComponentQuery.query('#ephone3')[0].setValue('');
                        Ext.ComponentQuery.query('#ephoneType3')[0].setValue('');
                    }
                }
                else {
                    Ext.ComponentQuery.query('#ephone1')[0].setValue('');
                    Ext.ComponentQuery.query('#ephone2')[0].setValue('');
                    Ext.ComponentQuery.query('#ephone3')[0].setValue('');
                    Ext.ComponentQuery.query('#ephoneType1')[0].setValue('');
                    Ext.ComponentQuery.query('#ephoneType2')[0].setValue('');
                    Ext.ComponentQuery.query('#ephoneType3')[0].setValue('');
                }
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('editCustomerFailed');
        }
    });
}

function refreshCustomerList(customerID) {
    var customerStore = Ext.create('jobtracker.store.customerstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    customerStore.on("load", function (store, records, options) {

        var customerListDataView = Ext.ComponentQuery.query('#customerListDataView')[0];
        customerListDataView.itemSelector = 'div.customerSelectBox';
        customerListDataView.bindStore(customerStore);

        if (customerID != null) selectCustomer(customerID);
    });

    customerStore.load();
}


function updateCustomer(customerIDParam, firstNameParam, lastNameParam, companyParam, address1Param, address2Param, cityParam, stateParam, zipParam, addressTypeParam, phone1Param, phone2Param, phone3Param, phoneType1Param, phoneType2Param, phoneType3Param, jobTypeParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#editCustomerForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/UpdateCustomerHandler.ashx',
        type: 'POST',
        data: {
            CustomerID: customerIDParam,
            FirstName: firstNameParam,
            LastName: lastNameParam,
            Company: companyParam,
            Address1: address1Param,
            Address2: address2Param,
            City: cityParam,
            State: stateParam,
            Zip: zipParam,
            AddressTypeID: addressTypeParam,
            Phone1: phone1Param,
            Phone2: phone2Param,
            Phone3: phone3Param,
            PhoneTypeID1: phoneType1Param,
            PhoneTypeID2: phoneType2Param,
            PhoneTypeID3: phoneType3Param,
            JobTypeID: jobTypeParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('updateCustomerFailed');
            }
            else {
                Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('customerUpdated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#editCustomerForm')[0].fireEvent('updateCustomerFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function customerUpdated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Customer updated.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function updateCustomerFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not update customer.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function deleteCustomer(customerID) {
    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this customer and the associated jobs?', function (btn) {
        if (btn == 'yes') reallyDeleteCustomer(customerID);
    });
}

function reallyDeleteCustomer(customerIDParam) {
    jQuery.ajax({
        url: 'Dispatchers/XML/DeleteCustomerHandler.ashx',
        type: 'POST',
        data: {
            CustomerID: customerIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#customerList')[0].fireEvent('deleteCustomerFailed');
            }
            else {
                Ext.ComponentQuery.query('#customerList')[0].fireEvent('customerDeleted');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#customerList')[0].fireEvent('deleteCustomerFailed');
        }
    });
}


function customerDeleted() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Customer deleted.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function deleteCustomerFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not delete customer.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}


function jobPage(op, customerID, firstName, lastName, company, address1, address2, city, state, zip) {
    window.location.href = encodeURI("Jobs.aspx?CustomerID=" + customerID + "&FirstName=" + firstName + "&LastName=" + lastName + "&Company=" + company + "&Address1=" + address1 + "&Address2=" + address2 + "&City=" + city + "&State=" + state + "&Zip=" + zip);
}


function clearCustomerForm() {
    Ext.ComponentQuery.query('#firstName')[0].setValue('');
    Ext.ComponentQuery.query('#lastName')[0].setValue('');
    Ext.ComponentQuery.query('#lastName')[0].clearInvalid();
    Ext.ComponentQuery.query('#company')[0].setValue('');
    Ext.ComponentQuery.query('#address1')[0].setValue('');
    Ext.ComponentQuery.query('#address2')[0].setValue('');
    Ext.ComponentQuery.query('#city')[0].setValue('');
    Ext.ComponentQuery.query('#state')[0].setValue('');
    Ext.ComponentQuery.query('#zip')[0].setValue('');
    Ext.ComponentQuery.query('#phone1')[0].setValue('');
    Ext.ComponentQuery.query('#phone2')[0].setValue('');
    Ext.ComponentQuery.query('#phone3')[0].setValue('');
    Ext.ComponentQuery.query('#phoneType1')[0].setValue('');
    Ext.ComponentQuery.query('#phoneType2')[0].setValue('');
    Ext.ComponentQuery.query('#phoneType3')[0].setValue('');
    Ext.ComponentQuery.query('#jobType')[0].setValue('');
}


function selectCustomer(customerID) {
    var customerListDataView = Ext.ComponentQuery.query('#customerListDataView')[0];
    var n = customerListDataView.getNode(customerID.toUpperCase());
    n.scrollIntoView(customerListDataView);
}

