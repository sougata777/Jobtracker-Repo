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


var defaultCustomerLabelTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
'<div class="customerLabelSelectBox">',
    '<div><span style="color:#2e408c"><b>{[this.formatName(values.firstName, values.lastName)]}</b></span></div>',
    '<div style="clear:left;float:left">{company}</div>',
    '<div style="clear:left;float:left">{address1}</div>',
    '<div style="clear:left;float:left">{address2}</div>',
    '<div style="clear:left;float:left">{[this.formatCity(values.city, values.state, values.zip)]}</div>',
    '<div style="clear:left;float:left">{[this.addBlankLines(values.company, values.address1, values.address2, values.city, values.state, values.zip)]}</div>',
    '<div style="clear:left;float:left"><span style="color:#2e408c;font-size:x-small">[&nbsp;<b><a href="javascript:void(0)" onclick="chooseCustomer();return false;">Change Customer</a></b>&nbsp;]</span></div>',
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
        var blanks = '<br/>';
        //if (company == '') blanks += '<br/>';
        //if (address1 == '') blanks += '<br/>';
        //if (address2 == '') blanks += '<br/>';
        //if (city == '' && state == '' && zip == '') blanks += '<br/>';

        return blanks;
    },
    formatDate: function (value) {
        return Ext.Date.format(value, 'M j, Y');
    }
});

Ext.define('jobtracker.view.customerlabel', {
    extend: 'Ext.container.Container',
    itemId: 'customerLabel',
    layout: { type: 'hbox' },
    border: false,
    style: 'border:none',

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            frame: true,
            width: 570,
            border: false,
            style: 'border:none;',
            items: [{
                autoScroll: true,
                border: false,
                style: 'border:none',
                itemId: 'customerLabelDataView',
                xtype: 'dataview',
                tpl: defaultCustomerLabelTpl,
                itemSelector: 'div.customerLabelSelectBox'
            }]
        }]
    }
});

