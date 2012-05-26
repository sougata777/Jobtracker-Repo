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



function printCustomersButton() {
    var pc = Ext.create('Ext.Button', {
        text: 'Print Customer List',
        scale: 'large',
        iconCls: 'printCustomersIcon',
        renderTo: 'printCustomersButton',
        handler: function () {
            this.fireEvent('printCustomers');
        }
    });

    return pc;
}


function printCustomersPage() {
    window.open(encodeURI("Print.aspx?list=Customer"), "_blank");
}


function printCustomers() {
    var printCustomer = Ext.create('jobtracker.view.printcustomer', {
        renderTo: 'printArea'
    });

    var customerStore = Ext.create('jobtracker.store.customerstore', {
        autoLoad: false
    });

    // store's load is asynchronous
    customerStore.on("load", function (store, records, options) {

        var printCustomerDataView = Ext.ComponentQuery.query('#printCustomerDataView')[0];
        printCustomerDataView.bindStore(customerStore);
    });

    customerStore.load();
}



function printJobsButton() {
    var pc = Ext.create('Ext.Button', {
        text: 'Print Job List',
        scale: 'large',
        iconCls: 'printJobsIcon',
        renderTo: 'printJobsButton',
        handler: function () {
            var printJobDataView = Ext.ComponentQuery.query('#printJobDataView')[0];
            this.fireEvent('printJobs');
        }
    });

    return pc;
}


function printJobsPage(customerID) {
    window.open(encodeURI("Print.aspx?list=Job&CustomerID=" + customerID), "_blank");
}


function printJobs(customerID) {

    var invoiceReader = new Ext.data.XmlReader({
        record: 'Invoice',
        fields: ['InvoiceID', 'InvoiceNo', 'PaymentTypeName', 'PaymentStatusName']
    });

    var itemReader = new Ext.data.XmlReader({
        record: 'Item',
        fields: ['ItemID', 'ItemNo', 'SKU', 'Description', 'Quantity', 'Amount', 'InvoiceID']
    });

    var printJob = Ext.create('jobtracker.view.printjob', {
        renderTo: 'printArea'
    });

    var jobStore = Ext.create('jobtracker.store.jobstore', {
        autoLoad: false,
        reader: {
            type: 'xml',
            record: 'Job',
            fields: [
                'JobID',
                'JobNo',
                'CustomerID',
                'SerialNo',
                'ProjectNo',
                'PONo',
                'ServiceOrderNo',
                'DispatchNo',
                'JobStatusID',
                'SalesCheckNo',
                'Technician',
                'Notes',
                'InstallDate',
                'InstallTimeFrom',
                'InstallTimeTo',
                {
                    name: 'invoices',
                    convert: function (v, n) {
                        return invoiceReader.readRecords(n).records;
                    }
                },
                {
                    name: 'items',
                    convert: function (v, n) {
                        return itemReader.readRecords(n).records;
                    }
                }
            ]
        }
    });

    jobStore.proxy.extraParams.CustomerID = customerID;

    // store's load is asynchronous
    jobStore.on("load", function (store, records, options) {

        var printJobDataView = Ext.ComponentQuery.query('#printJobDataView')[0];
        printJobDataView.bindStore(jobStore);
    });

    jobStore.load();

}


function printRoutingSheet() {

    var invoiceReader = new Ext.data.XmlReader({
        record: 'Invoice',
        fields: ['InvoiceID', 'InvoiceNo', 'PaymentTypeName', 'PaymentStatusName']
    });

    var itemReader = new Ext.data.XmlReader({
        record: 'Item',
        fields: ['ItemID', 'ItemNo', 'SKU', 'Description', 'Quantity', 'Amount', 'InvoiceID']
    });

    var printJob = Ext.create('jobtracker.view.printroutingsheet', {
        renderTo: 'printArea'
    });

    var jobStore = Ext.create('jobtracker.store.routingsheetstore', {
        autoLoad: false,
        reader: {
            type: 'xml',
            record: 'Job',
            fields: [
                'JobID',
                'JobNo',
                'CustomerID',
                'SerialNo',
                'ProjectNo',
                'PONo',
                'ServiceOrderNo',
                'DispatchNo',
                'JobStatusID',
                'SalesCheckNo',
                'Technician',
                'Notes',
                'InstallDate',
                'InstallTimeFrom',
                'InstallTimeTo',
                {
                    name: 'invoices',
                    convert: function (v, n) {
                        return invoiceReader.readRecords(n).records;
                    }
                },
                {
                    name: 'items',
                    convert: function (v, n) {
                        return itemReader.readRecords(n).records;
                    }
                }
            ]
        }
    });

    // store's load is asynchronous
    jobStore.on("load", function (store, records, options) {

        var printRoutingSheetDataView = Ext.ComponentQuery.query('#printRoutingSheetDataView')[0];
        printRoutingSheetDataView.bindStore(jobStore);
    });

    jobStore.load();

}
