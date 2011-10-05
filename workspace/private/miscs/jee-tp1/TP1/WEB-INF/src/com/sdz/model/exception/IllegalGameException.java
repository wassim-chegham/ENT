package com.sdz.model.exception;

public class IllegalGameException extends Exception {	
	public IllegalGameException(){
		super("Vous avez choisi plusieurs fois le même numéro ! !");
	}	
}
