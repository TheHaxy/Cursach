<?php
/* Здесь проверяется существование переменных */
if (isset($_POST['tel'])) {$phone = $_POST['tel'];}
if (isset($_POST['fio'])) {$name = $_POST['fio'];}
if (isset($_POST['adress'])) {$adress = $_POST['adress'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['data-summary'])) {$prodSummary = $_POST['data-summary'];}
if (isset($_POST['data-name'])) {$prodName = $_POST['data-name'];}

/* Сюда впишите свою эл. почту */
$myaddres  = "troshin-store@mail.ru"; // кому отправляем
$mailTo = $email;
/* А здесь прописывается текст сообщения, \n - перенос строки */
$mesOne = "Заказ оформлен!\nТелефон поставщика: +79895643211\nПрибудет по адрессу: $adress\nE-mail: troshin-store@mail.ru\nСумма к оплате: $prodSummary\nВаши товары: \n$prodName";
$mesTwo = "Заказ оформлен!\nТелефон: $phone\nИмя: $name\nАдресс отправки: $adress\nE-mail: $email\nСумма к оплате: $prodSummary\nТовары на отправку: \n$prodName";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Заказ'; //сабж
$email='Заказ обратного звонка'; // от кого
$send = mail ($mailTo,$sub,$mesOne,"Content-type:text/plain; charset = utf-8\r\nFrom:$myaddres");
$send2 = mail ($myaddres,$sub,$mesTwo,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=index.html');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="refresh" content="3; url=index.html">
    <title>Спасибо! Мы свяжемся с вами!</title>
    <meta name="generator">
    <script type="text/javascript">
        setTimeout('location.replace("/index.html")', 3000);
        /*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
    </script>
</head>
<body>
<h1 style="text-align: center">Спасибо! Мы свяжемся с вами!</h1>
</body>
</html>
