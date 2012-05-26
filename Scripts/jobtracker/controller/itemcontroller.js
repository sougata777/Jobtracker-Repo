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



function createInvoiceLabel(invoiceNoParam) {

    Ext.define('jobtracker.model.invoicelabel', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'InvoiceNo', type: 'string' },
        ]
    });

    var ilb = Ext.create('jobtracker.view.invoicelabel', {
        renderTo: 'invoiceLabel'
    });

    return ilb;
}

function assignItemToInvoice(invoiceID) {
    Ext.ComponentQuery.query('#hiInvoiceID')[0].setValue(invoiceID);
}

function fillOutInvoiceLabel(invoiceNumberParam) {

    var invoiceLabelStore = Ext.create('Ext.data.Store', {
        model: 'jobtracker.model.invoicelabel',
        autoLoad: true,
        data: [
            {
                InvoiceNo: invoiceNumberParam
            }
        ]
    });

    var invoiceLabelDataView = Ext.ComponentQuery.query('#invoiceLabelDataView')[0];
    invoiceLabelDataView.bindStore(invoiceLabelStore);
}


function createItemForm() {
    var cit = Ext.create('jobtracker.view.createitemform', {
        renderTo: 'createItemForm',
        hidden: true
    });
    
    return cit;
}


function editItemForm() {
    var eit = Ext.create('jobtracker.view.edititemform', {
        renderTo: 'editItemForm',
        hidden: true
    });

    return eit;
}


function createItem(invoiceIDParam, itemNumberParam, skuParam, descriptionParam, qtyParam, amountParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#createItemForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/CreateItemHandler.ashx',
        type: 'POST',
        data: {
            InvoiceID: invoiceIDParam,
            ItemNumber: itemNumberParam,
            SKU: skuParam,
            Description: descriptionParam,
            Qty: qtyParam,
            Amount: amountParam
        },
        beforeSend: function () {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#createItemForm')[0].fireEvent('createItemFailed');
            }
            else {
                Ext.ComponentQuery.query('#createItemForm')[0].fireEvent('itemCreated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#createItemForm')[0].fireEvent('createItemFailed');
        },
        complete: function () {
            mask.hide();
        }
    });
}


function itemCreated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Item created.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function createItemFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not create item.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function editItemFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not get item details.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}


function editItem(itemIDParam, itemNumberParam, skuParam, descriptionParam, qtyParam, amountParam) {
    Ext.ComponentQuery.query('#ehItemID')[0].setValue(itemIDParam);
    Ext.ComponentQuery.query('#eitemNumber')[0].setValue(itemNumberParam);
    Ext.ComponentQuery.query('#esku')[0].setValue(skuParam);
    Ext.ComponentQuery.query('#edescription')[0].setValue(descriptionParam);
    Ext.ComponentQuery.query('#eqty')[0].setValue(qtyParam);
    Ext.ComponentQuery.query('#eamount')[0].setValue(amountParam);
}



function updateItem(itemIDParam, itemNumberParam, skuParam, descriptionParam, qtyParam, amountParam) {

    var mask = new Ext.LoadMask(Ext.ComponentQuery.query('#editItemForm')[0], { msg: "Please wait..." });

    jQuery.ajax({
        url: 'Dispatchers/XML/UpdateItemHandler.ashx',
        type: 'POST',
        data: {
            ItemID: itemIDParam,
            ItemNumber: itemNumberParam,
            SKU: skuParam,
            Description: descriptionParam,
            Qty: qtyParam,
            Amount: amountParam
        },
        beforeSend: function() {
            mask.show();
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#editItemForm')[0].fireEvent('updateItemFailed');
            }
            else {
                Ext.ComponentQuery.query('#editItemForm')[0].fireEvent('itemUpdated');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#editItemForm')[0].fireEvent('updateItemFailed');
        },
        complete: function() {
            mask.hide();
        }
    });
}


function itemUpdated() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Item updated.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function updateItemFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not update item.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}

function deleteItem(itemID) {
    Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this item?', function (btn) {
        if (btn == 'yes') reallyDeleteItem(itemID);
    });
}

function reallyDeleteItem(itemIDParam) {
    jQuery.ajax({
        url: 'Dispatchers/XML/DeleteItemHandler.ashx',
        type: 'POST',
        data: {
            ItemID: itemIDParam
        },
        success: function (response) {
            if (response == 'error') {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteItemFailed');
            }
            else {
                Ext.ComponentQuery.query('#jobList')[0].fireEvent('itemDeleted');
            }
        },
        failure: function (response) {
            Ext.ComponentQuery.query('#jobList')[0].fireEvent('deleteItemFailed');
        }
    });
}


function itemDeleted() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Item deleted.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function deleteItemFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Could not delete item.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}