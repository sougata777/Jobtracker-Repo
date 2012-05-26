<%@ Page Title="Print" Language="C#" AutoEventWireup="true" CodeBehind="Print.aspx.cs" Inherits="JobTracker.Print" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head id="Head1" runat="server">
    <title>Print</title>
    <link href="~/Styles/Site.css" rel="stylesheet" type="text/css" />
    <link href="~/Styles/jobtracker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="~/Lib/ext-js/resources/css/ext-all.css" />  
    
    <script type="text/javascript" src="Lib/ext-js/ext-all.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/app.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/model/customer.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/job.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/invoice.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/model/item.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/view/printcustomer.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/printjob.js"></script>
    <script type="text/javascript" src="Scripts/jobtracker/view/printroutingsheet.js"></script>

    <script type="text/javascript" src="Scripts/jobtracker/controller/printcontroller.js"></script>

    <style type="text/css">
        a:link {color:#2e408c;}   
        a:visited {color:#2e408c;}
        a:hover {color:#2e408c;}
        a:active {color:#2e408c;}      
    </style>
    
    <script type="text/javascript">

        Ext.require(['Ext.data.*']);

        Ext.onReady(function () {
            var pageParameters = Ext.urlDecode(window.location.search.substring(1));

            switch (pageParameters.list) {
                case "Customer":
                    printCustomers();
                    break;

                case "Job":
                    printJobs(pageParameters.CustomerID);
                    break;

                case "RoutingSheet":
                    printRoutingSheet();
                    break;
            }
        });

    </script>
</head>

<body style="background-color:White">

    <div style="margin:50px;margin-top:10px;margin-left:40px;float:left;">
        <div id="printArea" class="printArea"></div>
    </div>

</body>
</html>
