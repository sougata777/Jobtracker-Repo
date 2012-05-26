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



function newUserButton() {
    var nu = Ext.create('Ext.Button', {
        text: 'Register a New User',
        scale: 'large',
        iconCls: 'newUserIcon',
        renderTo: 'newUserButton',
        width: 200,
        handler: function () {
            registerPage();
        }
    });

    return nu;
}

function clearCacheButton() {
    var cc = Ext.create('Ext.Button', {
        text: 'Clear Cache',
        scale: 'large',
        iconCls: 'clearCacheIcon',
        renderTo: 'clearCacheButton',
        width: 200,
        handler: function () {
            jQuery.ajax({
                url: 'Dispatchers/XML/ClearCacheHandler.ashx',
                type: 'POST',
                success: function (response) {
                    if (response == 'error') {
                        clearCacheFailed();
                    }
                    else {
                        cacheCleared();
                    }
                },
                failure: function (response) {
                    clearCacheFailed();
                }
            });
        }
    });

    return cc;
}


function registerPage() {
    window.location.href = encodeURI("/Account/Register.aspx");
}

function cacheCleared() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Cache cleared.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function clearCacheFailed() {
    Ext.MessageBox.show({
        title: 'Jobtracker',
        msg: 'Clear cache failed.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}