package com.sdz.model;

import java.util.ArrayList;

import com.sdz.model.exception.IllegalGameException;

public class LoterieZ {

	/**
	 * Liste des num�ros du tirage
	 */
	private ArrayList<Integer> listNumero = new ArrayList<Integer>();
	
	/**
	 * Constructeur
	 */
	public LoterieZ(){
		for(int i=0; i < 2; i++){
			int num = (int)(Math.random() * 10);
			while(listNumero.contains(num)){
				num = (int)(Math.random() * 10);
			}
			listNumero.add(num);
		}
	}
	
	/**
	 * M�thode qui permet de voir si on a gagn� 
	 * @param val1
	 * @param val2
	 * @param val3
	 * @return
	 * @throws IllegalGameException
	 */
	public boolean match(int val1, int val2) 
							throws IllegalGameException{
		if(val1 == val2 )
			throw new IllegalGameException();
		else{
			return 	listNumero.contains(new Integer(val1)) &&
					listNumero.contains(new Integer(val2));
		}
	}
	
	/**
	 * M�thode qui retourne la liste des num�ros du tirage 
	 * @return
	 */
	public ArrayList<Integer> getTirage(){
		return this.listNumero;
	}
}
