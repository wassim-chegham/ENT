package com.sdz.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Index extends HttpServlet {

	public void doGet(	HttpServletRequest request, 
						HttpServletResponse response)
						throws IOException, ServletException{
		//Bon, l�, c'est simple tout de m�me...
		request.getRequestDispatcher("index.jsp").forward(request, response);
		
	}	
}
