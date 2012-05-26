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


var defaultPrintCustomerTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
    '<div style="clear:left;float:left" class="printCustomerSelectBox" id="{CustomerID}">',
        '<div><span style="color:#2e408c"><b>{[this.formatName(values.FirstName, values.LastName)]}</b></span></div>',
        '<div style="clear:left;float:left">{Company}</div>',
        '<div style="clear:left;float:left">{Address1}</div>',
        '<div style="clear:left;float:left">{Address2}</div>',
        '<div style="clear:left;float:left">{[this.formatCity(values.City, values.State, values.Zip)]}</div>',
        '<div style="clear:left;float:left">{[this.addBlankLines(values.Company, values.Address1, values.Address2, values.City, values.State, values.Zip)]}</div>',
    '</div>',
'</tpl>',
{
    formatName: function (firstName, lastName) {
        if (firstName == '') return lastName;
        return firstName + ' ' + lastName;
    },
    formatCity: function (city, state, zip) {
        if (city == '' && state == '' && zip == '') return '';

        if (city == '' && state == '') return zip;
        if (city == '' && zip == '') return state;
        if (state == '' && zip == '') return city;

        if (city == '') return state + ' ' + zip;
        if (state == '') return city + ', ' + zip;
        if (zip == '') return city + ', ' + state;

        return city + ', ' + state + ' ' + zip;
    },
    addBlankLines: function (company, address1, address2, city, state, zip) {
        var blanks = '<br/><br/>';
        if (company == '') blanks += '<br/>';
        if (address1 == '') blanks += '<br/>';
        if (address2 == '') blanks += '<br/>';
        if (city == '' && state == '' && zip == '') blanks += '<br/>';

        return blanks;
    },
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});

Ext.define('jobtracker.view.printcustomer', {
    extend: 'Ext.container.Container',
    itemId: 'printCustomer',
    layout: { type: 'hbox' },
    width: 600,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
                    xtype: 'container',
                    items: [{
                        autoScroll: true,
                        itemId: 'printCustomerDataView',
                        emptyText: 'There are no customers to display.',
                        xtype: 'dataview',
                        tpl: defaultPrintCustomerTpl,
                        itemSelector: 'div.printCustomerSelectBox',
                        width: 600,
                        singleSelect: true
                    }]
                }]
    }
});

