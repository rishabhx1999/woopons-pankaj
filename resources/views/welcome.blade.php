<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ env('APP_NAME') }}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJw0QfJXXleECtFD5031OMG75lZMiC6dY&libraries=places,visualization" ></script>

    </head>
    <body>
        <div class="d-flex flex-column">
            <div id="root"></div>
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
        
        
    </body>
</html>