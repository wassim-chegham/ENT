<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body style="width:50%; margin:auto;">
	<h2 style="text-align:center;color:white;background-color:#787878">Bienvenue à la loterieZ !</h2>
	<p style="text-align:center;border:1px dashed black; padding:5px;background-color:#efefef">
		<span style="text-decoration:underline;font-style:italic;font-size:1.1em">
			Le but du jeu est simple :
		</span><br /> 
		Vous devez choisir 2 numéros différents dans les listes suivantes !<br />
		Ensuite, vous n'avez plus qu'à valider et voir si vous avez gagné...<br />
		Bonne chance. :)	
	</p>
	
	<form action="tirage.do" method="post" style="text-align:center">
		
		<%
			//On génère les champs.
			for(int i = 1; i < 3; i++){
				out.println("Numéro " + i + ": <select name=\"number"+i+"\">");
				for(int j = 1; j <= 10; j++){
					out.println("<option value=\""+j+"\">"+ j + "</option>");
				}
				out.println("</select><br />");
			}
		%>
		<br />
		<input type="submit" value="Valider" />
	</form>
</body>
</html>