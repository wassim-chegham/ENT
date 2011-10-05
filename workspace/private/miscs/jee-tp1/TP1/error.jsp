<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body style="width:50%; margin:auto;">
	<h2 style="text-align:center;color:white;background-color:red;border:2px solid black">
		Une erreur est survenue : <br />
		<%=request.getAttribute("error").toString() %>
	</h2>
	
	<h2 style="text-align:center">Vous pouvez retenter votre chance en suivant <a href="home">ce lien</a></h2>
	
</body>
</html>