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


var defaultCustomerListTpl = Ext.create('Ext.XTemplate',
'<tpl for=".">',
    '<div style="clear:left;float:left" class="customerSelectBox" onmouseover="HighlightThis(this);" onmouseout="UnhighlightThis(this);" id="{CustomerID}">',
        '<div><span style="color:#2e408c"><b>{[this.formatName(values.FirstName, values.LastName)]}</b></span></div>',
        '<div style="clear:left;float:left">{Company}</div>',
        '<div style="clear:left;float:left">{Address1}</div>',
        '<div style="clear:left;float:left">{Address2}</div>',
        '<div style="clear:left;float:left">{[this.formatCity(values.City, values.State, values.Zip)]}</div>',
        '<div style="clear:left;float:left">{[this.addBlankLines(values.Company, values.Address1, values.Address2, values.City, values.State, values.Zip)]}</div>',
        '<div style="clear:left;float:left">',
            '<span style="color:#2e408c;font-size:x-small">[&nbsp;<b><a href="javascript:void(0)"; onclick="jobPage(\'view\', \'{CustomerID}\', \'{FirstName}\', \'{LastName}\', \'{Company}\', \'{Address1}\', \'{Address2}\', \'{City}\', \'{State}\', \'{Zip}\');">Manage Jobs</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="editCustomer(\'{CustomerID}\');return false;">Edit this customer</a></b>&nbsp;]&nbsp;&nbsp;&nbsp;&nbsp;',
                '[&nbsp;<b><a href="javascript:void(0)" onclick="deleteCustomer(\'{CustomerID}\');return false;">Delete this customer</a></b>&nbsp;]',
            '</span>',
        '</div>',
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

Ext.define('jobtracker.view.customerlist', {
    extend: 'Ext.container.Container',
    itemId: 'customerList',
    layout: { type: 'hbox' },
    width: 600,
    height: 700,

    initComponent: function () {
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function () {
        return [{
            xtype: 'panel',
            title: 'Our Customers',
            frame: true,
            width: 600,
            height: 700,
            autoScroll: true,
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                items: [{
                    autoScroll: true,
                    viewConfig: {
                        preserveScrollOnRefresh: true
                    },
                    itemId: 'customerListDataView',
                    emptyText: 'There are no customers to display.',
                    xtype: 'dataview',
                    tpl: defaultCustomerListTpl,
                    itemSelector: 'div.customerSelectBox',
                    width: 580,
                    singleSelect: true,
                    listeners: {
                        itemClick: function (view, record, item, index, e, opts) {
                            var selectedNode = item;
                            Ext.ComponentQuery.query('#customerList')[0].fireEvent('customerSelected', selectedNode);
                        }
                    }
                }]
            }]
        }]
    }
});

