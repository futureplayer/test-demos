    <link rel="canonical" href="">
    <style mip-custom>

    </style>
</head>

<body>
    <p>原cookie大小：<span id="origin"></span></p>
    <p>现cookie大小：<span id="current"></span></p>
    <p>剩余cookie：<span id="cookie"></span></p>
    <script src="./mip-cookie.js"></script>
    <script type="text/javascript">
    var str = 'a';
    for (var i = 0; i < 3 * 1024; i++) {
        str += 'a';
    };
    document.cookie = "name1=" + str + ';path=/;domain=' + window.location.hostname;
    document.cookie = "name2=" + str + ';path=/;domain=' + window.location.hostname;
    document.cookie = "name3=" + str + ';path=/;domain=' + window.location.hostname;
    document.cookie = "name4=" + str + ';path=/;domain=' + window.location.hostname;

    var origin = document.querySelector('#origin');
    var current = document.querySelector('#current');
    var cookie = document.querySelector('#cookie');
    console.log(document.cookie.length / 1024);

    setTimeout(function () {
        origin.innerText = document.cookie.length / 1024 + 'k';
        var CustomStorage = require('util').customStorage;
        var storage = new CustomStorage(2);
        storage.delExceedCookie();
        setTimeout(function() {
            current.innerText = document.cookie.length / 1024 + 'k';
            cookie.innerText = document.cookie;
        }, 1000);
    }, 5000);
    </script>
</body>

</html>
