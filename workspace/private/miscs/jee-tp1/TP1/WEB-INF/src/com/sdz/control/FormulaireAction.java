package com.sdz.control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sdz.model.LoterieZ;
import com.sdz.model.exception.IllegalGameException;

public class FormulaireAction extends HttpServlet {

	public void doPost(	HttpServletRequest request, 
						HttpServletResponse response)
						throws IOException, ServletException{
		
		
		LoterieZ loto = new LoterieZ();
		
		String message = "";
		
		try {
			//On teste si le client a gagné ou pas
			if(loto.match(	Integer.parseInt(request.getParameter("number1")), 
							Integer.parseInt(request.getParameter("number2")))){
				message = "Félicitation, vous avez gagné ! ! ! ";
			}
			else{
				message = "Quel dommage, vous avez perdu... ";
			}
			//On affecte des attributs à notre JSP pour l'affichage
			request.setAttribute("message", message);
			request.setAttribute("number1", Integer.parseInt(request.getParameter("number1")));
			request.setAttribute("number2", Integer.parseInt(request.getParameter("number2")));
			request.setAttribute("tirage", loto.getTirage());
			
			request.getRequestDispatcher("show.jsp").forward(request, response);
			
		} catch (IllegalGameException e) {
			//Si le contrôle à levé une exception, on prend la JSP correspondante
			request.setAttribute("error", e.getMessage());
			request.getRequestDispatcher("error.jsp").forward(request, response);
		}			
	}	
}
