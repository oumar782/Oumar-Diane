<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.min.js"></script>
    <style>
        body {
            min-height: 100vh;
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: url("Images/4.png") center/cover;
            display: flex;
            flex-direction: column;
        }


        main {
            margin-top: 70px; /* Adjust this value if your header height changes */
            width: 90%; /* Adjusted for responsiveness */
            max-width: 1350px; /* Max-width for larger screens */
            margin: 0 auto; /* Center the main content horizontally */
            background-color: rgba(8, 8, 8, 0.5);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px rgba(27, 27, 27, 0.1);
            border-radius: 10px;
            overflow: hidden;
            padding: 20px;
        }

        .prest img {
            max-width: 100%;
            height: auto;
        }

        @media (max-width: 768px) {
            header nav {
                flex-direction: column;
                align-items: center;
            }

            header nav a {
                margin: 5px 0;
                font-size: 1rem;
            }
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
            box-sizing: border-box;
        }
        form {
            width: 90%;
            background-color: rgba(8, 8, 8, 0.5);
            padding: 50px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-top: 70px;
            backdrop-filter: blur(10px);
        }
        #map-container {
            width: 35%;
        }
        #map {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: white;
            font-size: 15px;
        }
        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            background-color: beige;
            font-size: 17px;
        }
        textarea {
            height: 150px;
        }
        input[type="submit"] {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 25px;
            margin-left: 350px;
        }
        input[type="submit"]:hover {
            background-color: black;
        }
        header {
            background: linear-gradient(to bottom, #333, #000);
            color: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: bold;
        }
        .logo-container {
            display: flex;
            align-items: center;
        }
        .logo-container img {
            max-height: 50px;
        }
        .logo-container h1 {
            margin-left: 10px;
            font-size: 32px;
            font-weight: bold;
            color: antiquewhite;
        }
        .menu ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }
        .menu ul li {
            margin-left: 20px;
        }
        .menu ul li a {
            text-decoration: none;
            color: #fff;
            transition: color 0.3s ease;
        }
        .menu ul li a:hover {
            color: #007bff;
        }
        .message-box {
            background-color: #f4f4f4;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .bx-menu {
    display: none;
}
            header {
            background: linear-gradient(to bottom, #333, #000);
            color: #fff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: bold;
        }
        .logo-container {
            display: flex;
            align-items: center;
        }
        .logo-container img {
            max-height: 50px;
        }
        .logo-container h1 {
            margin-left: 10px;
            font-size: 32px;
            font-weight: bold;
            color: antiquewhite;
        }
     /* Global styles for mobile responsiveness */
@media (max-width: 768px) {
    /* Style for the header */
    header {
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }

    /* Menu icon positioned to the left */
    header .bx-menu {
        display: block;
        font-size: 2rem;
        cursor: pointer;
        color: white;
        margin-right: auto; /* Move the icon to the left */
    }

    /* Mobile navigation menu */
    header nav {
        position: absolute;
        top: 70px;
        left: -100%;
        width: 100%;
        background: rgba(8, 8, 8, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: left 0.3s ease-in-out;
        z-index: 999;
    }

    header nav a {
        margin: 10px 0;
        font-size: 1.2rem;
    }

    nav.active {
        left: 0;
        text-decoration: none;
        
    }
}
    
    </style>
</head>
<body>
<header>
        <a href="#" class="logo"style="text-decoration: none;"><span>Oumar</span> Diané</a>
        <span class="menu-btn" id="menu-btn"><i class="bx bx-menu"></i></span>

        <nav id="navbar">
            <a href="A Propos.html" style="text-decoration: none;">À propos</a>
            <a href="Education.html"style="text-decoration: none;">Éducation</a>
            <a href="Service.html"style="text-decoration: none;">Services</a>
            
            <a href="reel.html"style="text-decoration: none;">Réalisations</a>
            <a href="contact.php"style="text-decoration: none;">Contact</a>
        </nav>
    </header>
    <main>
    <p style="color:white;font-size:25px; margin-top:55px;">
    Merci pour votre confiance. Mon expertise est entièrement dédiée à votre réussite. 
</p>
<p style="color:white;font-size:25px;">
    Forts de mon savoir-faire, je met tout en œuvre pour garantir le succès de vos projets. 
</p>
<p style="color:white;font-size:25px;">
    Je serai à votre disposition pour transformer vos idées en solutions concrètes et performantes.
</p>

    <div class="container">
        <form action="contact.php" method="POST">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" name="nom" required>

            <label for="prenom">Prénom:</label>
            <input type="text" id="prenom" name="prenom" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="objet">Objet:</label>
            <input type="text" id="objet" name="objet" required>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <input type="submit" value="Envoyer">
        </form>
    </div>
    </main>
    <footer class="footer">
        <div class="container text-center">
            <p style="color: #fff;">&copy; 2024 Oumar Diané - Tous droits réservés</p>
            <div class="social-icons">
            <a href="https://web.facebook.com/pdgoumar.diane/"><i class="bx bxl-facebook"></i></a>
                    <a href="tel:+2120721976288"><i class="bx bxl-whatsapp"></i></a>

                    <a href="https://www.linkedin.com/in/oumar-diane-173a53266/"><i class="bx bxl-linkedin"></i></a>
                    <a href="https://www.instagram.com/pdgoumarkoop/"><i class="bx bxl-instagram"></i></a>
            </div>
        </div>
    </footer>
    <?php
    // PHP code should be placed at the top of the file or in a separate file

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "odevolv";

        // Créer une connexion
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Vérifier la connexion
        if ($conn->connect_error) {
            die("Échec de la connexion: " . $conn->connect_error);
        }

        // Préparer et exécuter la requête
        $stmt = $conn->prepare("INSERT INTO message (nom, prenom, objet, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $_POST["nom"], $_POST["prenom"], $_POST["objet"], $_POST["message"]);

       
     
        $stmt->close();
        $conn->close();
    }
    ?>
      <script>
        document.getElementById('menu-btn').addEventListener('click', function() {
            const navbar = document.getElementById('navbar');
            navbar.classList.toggle('active');
        });
    </script>
</body>
</html>
