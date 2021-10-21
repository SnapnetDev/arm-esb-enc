<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Jikoo ESB | Log in</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet">
  <!-- Font Awesome -->
  {{-- <link rel="stylesheet" href="{{ asset('theme/plugins/fontawesome-free/css/all.min.css') }}"> --}}
  <!-- icheck bootstrap -->
  {{-- <link rel="stylesheet" href="{{ asset('theme/plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}"> --}}
  <!-- Theme style -->
  {{-- <link rel="stylesheet" href="{{ asset('theme/dist/css/adminlte.min.css') }}"> --}}

  <link rel="stylesheet" href="{{ asset('css/tailwind.css') }}?{{ uniqid() }}" />
  {{-- <link rel="stylesheet" href="{{ asset('css/app.css') }}" /> --}}
  <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />

  {{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> --}}

</head>

<body class="hold-transition font-encodeSans">

  {{-- <span id="root"></span> --}}
  <div id="root" data-theme="light">
  </div>
  <!-- /.login-box -->
  <!-- jQuery -->
  <script src="{{ asset('theme/plugins/jquery/jquery.min.js') }}"></script>
  <!-- Bootstrap 4 -->
  {{-- <script src="{{ asset('theme/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script> --}}
  <!-- Adminlte App -->
  {{-- <script src="{{ asset('theme/dist/js/adminlte.min.js') }}"></script> --}}

  <script src="{{ asset('toastr.min.js') }}"></script>
  <link rel="stylesheet" href="{{ asset('toastr.min.css') }}">
  {{-- <script src="{{ asset('theme/dist/js/adminlte.min.js') }}"></script> --}}

  <script src="{{ asset('js/app.js') }}?{{ uniqid() }}"></script>

</body>


</html>