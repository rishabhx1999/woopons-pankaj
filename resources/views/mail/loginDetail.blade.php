<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{env('APP_NAME')}}</title>
    <link rel="stylesheet" href="https://use.typekit.net/nzh0bps.css">
</head>

<body style="max-width: 600px;margin:  0 auto;box-sizing: border-box;font-family: itc-avant-garde-gothic-pro, sans-serif;">
    <div style="width: 100%;float:  left;background-color:#BE1D2D;padding: 0;">
        <div style="background-color:#BE1D2D;text-align: center;width: 100%;float:left;padding: 20px 0 0;color: #707070;">
            <img src="{{url('images/footer-logo.png')}}" style="width: 180px;" />
            <h2 style="font-size: 31px;font-weight: 800;color:#fff;margin: 30px 0 20px;">Hey {{ $name }}!</h2>
            <p style="font-size: 18px;text-align: center;color:#fff;margin-bottom: 20px;">We are so excited you are a part of the WOO-PONS family!</p>
            <h4 style="font-size: 21px;font-weight: 600;color:#fff;margin-top: 20px;">Below are your login details:</h4>
            <div>
                <p style="color:#fff; text-align: center;"><span>UserEmail : </span><span>{{ $email }}</span></p>
                <p style="color:#fff; text-align: center;"><span>Password : </span><span>{{ $password }}</span></p>
            </div>
            <!-- <a style="font-size: 17px;line-height: 28px;color:#fff;max-width: 330px;margin: 20px auto;" href=""> -->
            <!-- </a> -->
            <h3 style="font-size: 33px;font-weight: bold;margin: 50px 0 50px;color:#fff;">Thank you!</h3>
        </div>
        <footer style="background-color: #CFC514;width: 100%;float: left;text-align: center;padding: 10px 0">
            <div style="width:100%;float: left; text-align: center; color: #fff;font-size: 15px;">
                <p>&copy; 2022 The Woo-pons All rights reserved.</p>
            </div>
        </footer>
    </div>
</body>

</html>