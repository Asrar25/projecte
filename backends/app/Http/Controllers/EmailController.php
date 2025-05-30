<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Services\PdfService;
use Illuminate\Support\Facades\DB;


class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $userEmail = $request->input('email');
        $batteryId = $request->input('batteryId');

        // Validate inputs
        if (!$userEmail || !$batteryId) {
            return response()->json(['error' => 'Invalid input'], 400);
        }

        // Initialize PHPMailer
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST');
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = env('MAIL_ENCRYPTION');
            $mail->Port = env('MAIL_PORT');

            // Recipients
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($userEmail); // Add a recipient

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Your Battery Purchase Confirmation';

            $mail->Body = "
    <h2>Thank you for your purchase!</h2>
    <p>Dear Customer,</p>
    <p>We appreciate your recent purchase from <strong>Battery Store</strong>. Here are the details of your order:</p>
    <ul>
        <li><strong>Battery ID:</strong> $batteryId</li>
    </ul>
    <p>If you have any questions or need support, feel free to contact us at <a href='mailto:support@batterystore.com'>support@batterystore.com</a>.</p>
    <br>
    <p>Thank you for choosing us!</p>
    <p>Best regards,<br><strong>Battery Store Team</strong></p>
";
            $mail->AltBody = "Thank you for your purchase. Your Battery ID is: $batteryId.";


            // Send email
            $mail->send();
            return response()->json(['message' => 'Email sent successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo], 500);
        }
    }

    public function sendReceiptMail($pdfString,$customerID)
    {
        $customer = DB::table('users')->where('id', $customerID)->first();

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = env('MAIL_USERNAME');
        $mail->Password = env('MAIL_PASSWORD');
        $mail->SMTPSecure = env('MAIL_ENCRYPTION');
        $mail->Port = env('MAIL_PORT');

        $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
        $mail->addAddress($customer->email);
        $mail->addStringAttachment($pdfString, 'payment_receipt.pdf');

        $mail->isHTML(true);
        $mail->Subject = 'Your Battery Purchase Receipt';
        $mail->Body = '<p>Dear ' . $customer->name . ',</p><p>Thank you for your purchase. Please find the payment receipt attached.</p><p>Regards,<br>Battery Store</p>';

        $mail->send();
    } catch (Exception $e) {
            return response()->json(['message' => 'Email could not be sent. Error: ' . $mail->ErrorInfo], 500);
        }
    }

}
