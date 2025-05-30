<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;


use TCPDF;

class PdfService
{
    public function createSamplePDF()
    {
        $pdf = new TCPDF();
        $pdf->SetCreator('Laravel App');
        $pdf->SetAuthor('Your Name');
        $pdf->SetTitle('TCPDF Example');

        $pdf->AddPage();
        $pdf->writeHTML('<h1>Hello from TCPDF</h1>', true, false, true, false, '');

        // Return PDF as string
        return $pdf->Output('example.pdf', 'S');
    }

    public function createPaymentReceiptPDF($id, $quantity, $gstPercent, $customerID)
    {
        // Fetch battery info
        $battery = DB::table('batteries')->where('id', $id)->first();
        if (!$battery) {
            abort(404, 'Battery not found');
        }

        $supplierUser = DB::table('users')->where('id', $battery->userID)->first();

        // Fetch user info
        $customer = DB::table('users')->where('id', $customerID)->first();

        // Fetch category info
        $category = DB::table('categories')->where('id', $battery->category_id)->first();

        // Calculate pricing
        $unitPrice = $battery->price;
        $total = $unitPrice * $quantity;
        $tax = ($total * $gstPercent) / (100 + $gstPercent);
        $subtotal = $total - $tax;
        // Start TCPDF
        $pdf = new TCPDF();
        $pdf->SetCreator('Laravel App');
        $pdf->SetAuthor('Your Company Name');
        $pdf->SetTitle('Payment Receipt');
        $pdf->SetSubject('Receipt for your purchase');
        $pdf->SetMargins(15, 20, 15);
        $pdf->AddPage();

        // Build HTML
        $html = '
    <h2 style="color:#2E86C1;">BATTERY STORE COMPANY PVT LTD</h2>
    <p>54/2 Main Street<br>Guindy, Chennai, 600006<br>Email: support@batteryStore.in<br>Phone: (956) 456-7890</p>
    <hr style="border:1px solid #ccc;">

    <h3 style="text-align:center; color:#1F618D;">Payment Receipt</h3>
    <p style="text-align:right;">Date: ' . date('F j, Y') . '</p>

    <table cellpadding="5" style="width:100%; font-size:12px;">
        <tr>
            <td><strong>Receipt No:</strong> ' . strtoupper(uniqid('REC')) . '</td>
             <td><strong>Order ID:</strong> ORD-' . date('YmdHis') . '</td>
        </tr>
    </table>

     <h4>Customer Details</h4>
<table style="font-size:12px; width:100%;">
    <tr><td style="padding:2px;"><strong>Name:</strong></td><td style="padding:2px;">' . ($customer->name ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Email:</strong></td><td style="padding:2px;">' . ($customer->email ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Phone:</strong></td><td style="padding:2px;">' . ($customer->mobileNo ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Address:</strong></td><td style="padding:2px;">' . ($customer->address ?? '-') . '</td></tr>
</table>

<h4>Supplier Details</h4>
<table style="font-size:12px; width:100%;">
    <tr><td style="padding:2px;"><strong>Name:</strong></td><td style="padding:2px;">' . ($supplierUser->name ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Email:</strong></td><td style="padding:2px;">' . ($supplierUser->email ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Phone:</strong></td><td style="padding:2px;">' . ($supplierUser->mobileNo ?? '-') . '</td></tr>
    <tr><td style="padding:2px;"><strong>Address:</strong></td><td style="padding:2px;">' . ($supplierUser->address ?? '-') . '</td></tr>
</table>

    <br><br>

    <table border="1" cellpadding="8" cellspacing="0" style="width:100%; font-size:12px; border-collapse:collapse;">
        <thead style="background-color:#D6EAF8;">
            <tr>
                <th style="text-align:left;">Product</th>
                <th style="text-align:right;">Brand</th>
                <th style="text-align:right;">Model</th>
                <th style="text-align:right;">Capacity</th>
                <th style="text-align:right;">Voltage</th>
                <th style="text-align:right;">Category</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>' . $battery->name . '</td>
                <td style="text-align:right;">' . $battery->brand . '</td>
                <td style="text-align:right;">' . $battery->model . '</td>
                <td style="text-align:right;">' . $battery->capacity . '</td>
                <td style="text-align:right;">' . $battery->voltage . '</td>
                <td style="text-align:right;">' . ($category->name) . '</td>
            </tr>
        </tbody>
    </table>

    <br><br>

   <table border="1" cellpadding="8" cellspacing="0" style="width:100%; font-size:12px; border-collapse:collapse;">
    <thead style="background-color:#D6EAF8;">
        <tr>
            <th style="text-align:right;">Quantity</th>
            <th style="text-align:right;">Unit Price</th>
            <th style="text-align:right;">Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:right;">' . $quantity . '</td>
            <td style="text-align:right;">$' . number_format($unitPrice, 2) . '</td>
            <td style="text-align:right;">$' . number_format($subtotal, 2) . '</td>
        </tr>
       <tr>
    <td colspan="2" style="text-align:right;"><strong>GST (' . $gstPercent . '%)</strong></td>
    <td style="text-align:right;">$' . number_format($tax, 2) . '</td>
</tr>
<tr>
    <td colspan="2" style="text-align:right;"><strong>Total (incl. GST)</strong></td>
    <td style="text-align:right;"><strong>$' . number_format($total, 2) . '</strong></td>
</tr>
    </tbody>
</table>

    <br><br>

    <p style="text-align:center; font-style:italic; font-size:11px; color:#555;">
        Thank you for your purchase! If you have any questions, please contact our support team.
    </p>';

        // Output PDF as string
        $pdf->writeHTML($html, true, false, true, false, '');
        return $pdf->Output('payment_receipt.pdf', 'S');
        // return $pdf->Output('', 'S');
    }

}
