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



Ext.define('jobtracker.model.job', {
    extend: 'Ext.data.Model',

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
        {name: 'JobStatusName', mapping:'JobStatus > JobStatusName'},
        {name: 'InstallTimeFrom', mapping:'InstallFromName > InstallFromTime'},
        {name: 'InstallTimeTo', mapping:'InstallToName > InstallToTime'}
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'jobtracker.model.invoice',
            name: 'invoices',
            associationKey: 'Invoices',
            reader: {
                type: 'xml',
                model: 'jobtracker.model.invoice',
                record: 'Invoice'
            }
        },

        {
            type: 'hasMany',
            model: 'jobtracker.model.attachment',
            name: 'attachments',
            associationKey: 'Attachments',
            reader: {
                type: 'xml',
                model: 'jobtracker.model.attachment',
                record: 'Attachment'
            }
        }
    ]
});

Ext.define('jobtracker.store.jobstore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'jobtracker.model.job',
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/GetJobsHandler.ashx',
        extraParams: {
            CustomerID: '9857FD92-3858-E111-A7DB-782BCB0CCADC'
        },
        reader: {
            type: 'xml',
            record: 'Job'
        }
    },

    initComponent: function () {
        this.superclass().initComponent.call(this);
    }
});


Ext.define('jobtracker.model.searchjob', {
    extend: 'Ext.data.Model',

    fields: [
        'JobID',
        'JobNo',
        'JobTypeID',
        'JobType',
        'CustomerID',
        'SerialNo',
        'ProjectNo',
        'PONo',
        'ServiceOrderNo',
        'DispatchNo',
        'JobStatusID',
        'JobStatus',
        'SalesCheckNo',
        'Technician',
        'Notes',
        'InstallDate',
        'InstallTimeFrom',
        'InstallTimeTo',
        'FirstName',
        'LastName',
        'Company',
        'Address1',
        'Address2',
        'City',
        'State',
        'Zip',
        'InvoiceID',
        'InvoiceNo',
        'PaymentStatusID',
        'PaymentStatus',
        'ItemID',
        'ItemNo',
        'Description',
        'Quantity',
        'Amount',
        'Phone'
    ]
});


Ext.define('jobtracker.store.searchjobstore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'jobtracker.model.searchjob',
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/SearchJobsHandler.ashx',
        extraParams: {
            JobTypeID: '',
            JobStatusID: '',
            JobNumber: '',
            SerialNumber: '',
            InstallDate: '',
            LastName: '',
            InvoiceNumber: '',
            PaymentStatusID: '',
            ItemNumber: '',
            PhoneNumber: ''
        },
        reader: {
            type: 'xml',
            record: 'Job'
        }
    },

    initComponent: function () {
        this.superclass().initComponent.call(this);
    }
});


Ext.define('jobtracker.store.routingsheetstore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'jobtracker.model.searchjob',
    proxy: {
        type: 'ajax',
        url: 'Dispatchers/XML/RoutingSheetHandler.ashx',
        reader: {
            type: 'xml',
            record: 'Job'
        }
    },

    initComponent: function () {
        this.superclass().initComponent.call(this);
    }
});

