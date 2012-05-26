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



function createJobLabel() {

    Ext.define('jobtracker.model.joblabel', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'JobNo', type: 'string' },
            { name: 'InstallDate', type: 'string' }
        ]
    });

    var jlb = Ext.create('jobtracker.view.joblabel', {
        renderTo: 'jobLabel',
        hidden: true
    });

    return jlb;
}

function assignInvoiceToJob(jobID) {
    Ext.ComponentQuery.query('#hJobID')[0].setValue(jobID);
}

function fillOutJobLabel(jobIDParam, jobNumberParam, installDateParam) {

    var jobLabelStore = Ext.create('Ext.data.Store', {
        model: 'jobtracker.model.joblabel',
        autoLoad: true,
        data: [
            {
                JobNo: jobNumberParam,
                InstallDate: installDateParam
            }
        ]
    });

    var jobLabelDataView = Ext.ComponentQuery.query('#jobLabelDataView')[0];
    jobLabelDataView.bindStore(jobLabelStore);
}

function createInvoiceForm() {
    var ci = Ext.create('jobtracker.view.createinvoiceform', {
        renderTo: 'createInvoiceForm',
        hidden: true
    });

    var paymentStatus = Ext.ComponentQuery.query('#paymentStatus')[0];
    var paymentType = Ext.ComponentQuery.query('#paymentType')[0];
    loadPaymentStatus(paymentStatus);
    loadPaymentType(paymentType);
    
    return ci;
}

function loadPaymentType(pt) {
    var paymentTypeStore = Ext.create('jobtracker.store.paymenttypestore', {
        autoLoad: false
    });

    // store's load is asynchronous
    paymentTypeStore.on("load", function (store, records, options) {
        pt.bindStore(paymentTypeStore);
    });

    paymentTypeStore.load();
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


function editInvoiceForm() {
    var ei = Ext.create('jobtracker.view.editinvoiceform', {
        renderTo: 'editInvoiceForm',
        hidden: true
    });

    var paymentStatus = Ext.ComponentQuery.query('#epaymentStatus')[0];
    var paymentType = Ext.ComponentQuery.query('#epaymentType')[0];
    loadPaymentStatus(paymentStatus);
    loadPaymentType(paymentType);

    return ei;
}


function createInvoice(jobIDParam, invoiceNumberParam, paymentStatusIDParam, paymentTypeIDParam) {
    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#createInvoiceForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/CreateInvoiceHandler.ashx',
        type: 'POST',
        data: {
            JobID: jobIDParam,
            InvoiceNumber: invoiceNumberParam,
            PaymentStatusID: paymentStatusIDParam,
            PaymentTypeID: paymentTypeIDParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#createInvoiceForm')[0].fireEvent('createInvoiceFailed');
            }
            else {
                Ext.ComponentQuery.query('#createInvoiceForm')[0].fireEvent('invoiceCreated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#createInvoiceForm')[0].fireEvent('createInvoiceFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function invoiceCreated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Invoice created.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function createInvoiceFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not create invoice.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editInvoiceFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not get invoice details.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editInvoice(invoiceIDParam, invoiceNumberParam, paymentStatusIDParam, paymentTypeIDParam) {
    Ext.ComponentQuery.query('#ehInvoiceID')[0].setValue(invoiceIDParam);
    Ext.ComponentQuery.query('#einvoiceNumber')[0].setValue(invoiceNumberParam);
    Ext.ComponentQuery.query('#epaymentStatus')[0].setValue(paymentStatusIDParam);
    Ext.ComponentQuery.query('#epaymentType')[0].setValue(paymentTypeIDParam);
}


function updateInvoice(invoiceIDParam, invoiceNumberParam, paymentStatusIDParam, paymentTypeIDParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#editInvoiceForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/UpdateInvoiceHandler.ashx',
        type: 'POST',
        data: {
            InvoiceID: invoiceIDParam,
            InvoiceNumber: invoiceNumberParam,
            PaymentStatusID: paymentStatusIDParam,
            PaymentTypeID: paymentTypeIDParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#editInvoiceForm')[0].fireEvent('updateInvoiceFailed');
            }
            else {
                Ext.ComponentQuery.query('#editInvoiceForm')[0].fireEvent('invoiceUpdated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#editInvoiceForm')[0].fireEvent('updateInvoiceFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function invoiceUpdated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Invoice updated.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function updateInvoiceFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not update invoice.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function deleteInvoice(invoiceID) {
    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this invoice?', function (btn) {
        if (btn == 'yes') reallyDeleteInvoice(invoiceID);
    });
}

function reallyDeleteInvoice(invoiceIDParam) {
    jQuery.ajax({
        url: 'Dispatchers/XML/DeleteInvoiceHandler.ashx',
        type: 'POST',
        data: {
            InvoiceID: invoiceIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteInvoiceFailed');
            }
            else {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('invoiceDeleted');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteInvoiceFailed');
        }
    });
}


function invoiceDeleted() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Invoice deleted.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function deleteInvoiceFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not delete invoice.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}