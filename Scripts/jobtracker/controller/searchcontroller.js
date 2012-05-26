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



function jobSearchForm() {
    var js = Ext.create('jobtracker.view.jobsearchform', {
        renderTo: 'jobSearchForm',
        hidden: false
    });

    var jobType = Ext.ComponentQuery.query('#jobType')[0];
    loadJobType(jobType);

    var jobStatus = Ext.ComponentQuery.query('#jobStatus')[0];
    loadJobStatus(jobStatus);

    var paymentStatus = Ext.ComponentQuery.query('#paymentStatus')[0];
    loadPaymentStatus(paymentStatus);

    return js;
}


function loadJobStatus(js) {
    var jobStatusStore = Ext.create('jobtracker.store.jobstatusstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    jobStatusStore.on("load", function (store, records, options) {
        js.bindStore(jobStatusStore);
    });

    jobStatusStore.load();
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



function loadPaymentStatus(ps) {
    var paymentStatusStore = Ext.create('jobtracker.store.paymentstatusstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    paymentStatusStore.on("load", function (store, records, options) {
        ps.bindStore(paymentStatusStore);
    });

    paymentStatusStore.load();
}


function jobSearchResults() {
    var jsr = Ext.create('jobtracker.view.jobsearchresults', {
        renderTo: 'jobSearchResults',
        hidden: false
    });

    return jsr;
}


function searchJobs(searchType, searchParameter) {

    // alert(searchType + " : " + searchParameter);

    var jobStore = Ext.create('jobtracker.store.searchjobstore', {
        autoLoad: false,
        reader: {
            type: 'xml',
            record: 'Job'
        }
    });

    var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait...", store: jobStore });

    jobStore.proxy.extraParams.JobTypeID = '';
    jobStore.proxy.extraParams.JobStatusID = '';
    jobStore.proxy.extraParams.JobNumber = '';
    jobStore.proxy.extraParams.SerialNumber = '';
    jobStore.proxy.extraParams.InstallDate = '';
    jobStore.proxy.extraParams.LastName = '';
    jobStore.proxy.extraParams.InvoiceNumber = '';
    jobStore.proxy.extraParams.PaymentStatusID = '';
    jobStore.proxy.extraParams.ItemNumber = '';

    switch(searchType)
    {
        case 'jobType':
            jobStore.proxy.extraParams.JobTypeID = searchParameter;
            break;

        case 'jobStatus':
            jobStore.proxy.extraParams.JobStatusID = searchParameter;
            break;

        case 'jobNumber':
            jobStore.proxy.extraParams.JobNumber = searchParameter;
            break;

        case 'serialNumber':
            jobStore.proxy.extraParams.SerialNumber = searchParameter;
            break;

        case 'installDate':
            jobStore.proxy.extraParams.InstallDate = searchParameter;
            break;

        case 'lastName':
            jobStore.proxy.extraParams.LastName = searchParameter;
            break;

        case 'invoiceNumber':
            jobStore.proxy.extraParams.InvoiceNumber = searchParameter;
            break;

        case 'paymentStatus':
            jobStore.proxy.extraParams.PaymentStatusID = searchParameter;
            break;

        case 'itemNumber':
            jobStore.proxy.extraParams.ItemNumber = searchParameter;
            break;

        case 'phoneNumber':
            jobStore.proxy.extraParams.PhoneNumber = searchParameter;
            break;
    }

    // store's load is asynchronous
    jobStore.on("load", function (store, records, options) {

        var jobListDataView = Ext.ComponentQuery.query('#jobSearchResultsDataView')[0];
        jobListDataView.itemSelector = 'div.jobSearchResultsSelectBox';
        jobListDataView.bindStore(jobStore);
    });

    jobStore.load();
}


function jobPage(op, customerID, firstName, lastName, company, address1, address2, city, state, zip, jobID) {
    window.location.href = encodeURI("Jobs.aspx?CustomerID=" + customerID + "&FirstName=" + firstName + "&LastName=" + lastName + "&Company=" + company + "&Address1=" + address1 + "&Address2=" + address2 + "&City=" + city + "&State=" + state + "&Zip=" + zip + "&JobID=" + jobID);
}

