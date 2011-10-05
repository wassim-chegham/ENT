<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body style="width:50%; margin:auto;">
	<h2 style="text-align:center;color:white;background-color:blue;border:2px solid black">
		Bienvenue au tirage de la loterieZ !<br />
		Voici le tirage d'aujourd'hui : <br />
		<span style="font-size:1.4em;">
		<%
			//On récupère les numéros de la loterie et on les affiches
			ArrayList<Integer> list = (ArrayList<Integer>)request.getAttribute("tirage");
			for(int i = 0; i < list.size();i++){
				out.println(list.get(i));
				if(i < list.size() -1 )
					out.println(" - ");
			}
		%>
		
		</span>
	</h2>
	
	<h2 style="text-align:center">
		Vous aviez joué : 
			<%=request.getAttribute("number1").toString() %> - 
			<%=request.getAttribute("number2").toString() %><br />
		<%=request.getAttribute("message").toString() %>
	</h2>
	
	<h2 style="text-align:center">
		Vous pouvez tenter à nouveau votre chance en suivant <a href="home">ce lien</a>
	</h2>
	
	
	
</body>
</html>