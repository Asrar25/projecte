<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\EmailController;
use App\Services\PdfService;
use Illuminate\Support\Facades\DB;

class PdfController extends Controller
{
    public function download(PdfService $pdfService)
    {
        $pdfContent = $pdfService->createSamplePDF();

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="sample.pdf"');
    }

    public function downloadReceipt(PdfService $pdfService,EmailController $emailController,$id,$quantity,$gstPercent,$customerID)
    {
        $pdfContent = $pdfService->createPaymentReceiptPDF($id, $quantity, $gstPercent, $customerID);

    // 2. Call sendReceiptMail and pass the generated PDF
    $emailController->sendReceiptMail($pdfContent, $customerID);

    // 3. Return PDF for download/view
      return response($pdfContent, 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="payment-receipt.pdf"');
    }
}
