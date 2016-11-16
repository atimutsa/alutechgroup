<?php
if(!$_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest') die();

if(isset($_POST['name']) && isset($_POST['phone']) && !empty($_POST['name']) && !empty($_POST['phone'])){
    $body = "Имя: ".$_POST['name']."\n";
    $body .= "Телефон: ".$_POST['phone']."\n";
    echo (int)send_mime_mail_a('Лендинг Alutech','noreplay@alutech.group',['Тимуца Александр'],['a.timutsa@gmail.com'], 'UTF-8', 'KOI8-R', 'Заявка с лендинга Alutech', $body);
} else {
    die();
}

function send_mime_mail_a($name_from, // имя отправителя
                          $email_from, // email отправителя
                          $name_to, // массив имен получателя
                          $email_to, // массив email-адресов получателя
                          $data_charset, // кодировка переданных данных
                          $send_charset, // кодировка письма
                          $subject, // тема письма
                          $body // текст письма
) {
    $to = '';
    for($i=0;$i<count($name_to);$i++) {
        $to .= mime_header_encode($name_to[$i], $data_charset, $send_charset)  . ' <' . $email_to[$i] . '>' . ( ($i<count($name_to)-1)?', ':'');
    }
    $subject = mime_header_encode($subject, $data_charset, $send_charset);
    $from =  mime_header_encode($name_from, $data_charset, $send_charset)
        .' <' . $email_from . '>';
    if($data_charset != $send_charset) {
        $body = iconv($data_charset, $send_charset, $body);
    }
    $headers = "From: $from\r\n";
    $type = ($html) ? 'html' : 'plain';
    $headers .= "Content-type: text/$type; charset=$send_charset\r\n";
    $headers .= "Mime-Version: 1.0\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: $reply_to";
    }
    return mail($to, $subject, $body, $headers);
}

function mime_header_encode($str, $data_charset, $send_charset) {
    if($data_charset != $send_charset) {
        $str = iconv($data_charset, $send_charset, $str);
    }
    return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
}
?>