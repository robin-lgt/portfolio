<?php 	
function EstSalleChoisie($cod) {
	if (!isset($_SESSION['SALLECHOISIE'])) 
		{$_SESSION['SALLECHOISIE'] = $cod; return true;}
	else 
		{return ($_SESSION['SALLECHOISIE']==$cod); }
}

function getLundi() {
	return New DateTime($_SESSION['LUNDICHOISI']); 
}

function OuiNon($v) {
	if ($v==0) {return 'NON'; } else {return 'OUI';}
}
//--------------------------------------------------------------------

	$connex =new mysqli ("127.0.0.1","adm_resa","Passe1?","reservator") ; 
//mysqli_connect
	session_start() ;
	if (isset($_POST['SALLE'])) {$_SESSION['SALLECHOISIE'] = $_POST['SALLE']; }
	elseif (isset($_POST['LUNDI'])) {$_SESSION['LUNDICHOISI'] = $_POST['LUNDI']; } 
	elseif (isset($_POST['JOUR'])) {
		// enregistrement de la réservation
		$DT = '"'.$_POST['JOUR'].'"' ;
		$DEMI = '"'.$_POST['DEMI'].'"' ;
		$TXT = '"'.$_POST['TXT'].'"' ;
		$RES = '"'.$_POST['RES'].'"' ;
		if ($TXT!='""') {
			$req ='INSERT INTO res (rdate, rdemij, rcomment, ridsalle, ridempr) VALUES (' ;
			$req.= $DT.', '.$DEMI.', '.$TXT.', "'.$_SESSION['SALLECHOISIE'].'", '.$RES.')' ;
			$OPER = mysqli_query($connex, $req) ;	
		} 
		} 
	elseif (isset($_POST['DROPNUM'])) {
		// effacement réservation
		$LEJOUR = getLundi();
		$NJ = intval($_POST['DROPNUM']) ;
		echo '<!--'.$NJ."-->\n" ; 
		if ($NJ>1) {$LEJOUR->add(new DateInterval('P'.($NJ-1).'D')); }	
		$req = 'DELETE FROM res WHERE rdate="'.$LEJOUR->format('Y-m-d').'" and rdemij="'.$_POST['DROPAMPM'].'" and ridsalle="'.$_SESSION['SALLECHOISIE'].'"';
		$OPER = mysqli_query($connex, $req) ;
		}
	if (!isset($_SESSION['LUNDICHOISI'])) {
		$dtDepart = date('Y-m-d');
		$DTJ = New DateTime($dtDepart); 
		while (intval($DTJ->format('N'))!=1) {$DTJ->sub(new DateInterval('P1D'));}
		$_SESSION['LUNDICHOISI'] = $DTJ->format('Y-m-d') ;
	}
?>
<!DOCTYPE html>
<html>
<head>
<title>Réservation de salles</title>
<style>
th {width:15%;}
td {vertical-align:top; }
td.etiq {text-align:right; font-style:italic;}
div.reserv {border 1px black solid; background-color:#CCFFCC; border-radius:4px; padding:4px;}
div.empr {background-color:yellow; padding:0px 2px 0px 2px; }
span.suppr { background-color:pink; font-weight:bold; padding:0px 2px 0px 2px; cursor:pointer;}
</style>
<script>
function effacerReserv(numdj, ampm) {
	mess="Suppression réservation\nConfirmez-vous la suppression ?" ;
	if (confirm(mess)) {
		document.frmcachee.DROPNUM.value = numdj ;
		document.frmcachee.DROPAMPM.value = ampm ;
		document.frmcachee.submit() ;
	}
}
</script>		
</head>
<body style="background-color:#CCCCCC;">
<form name="frmcachee" method="post">
	<input type="hidden" name="DROPNUM" />
	<input type="hidden" name="DROPAMPM" />
</form>
<table>
<tr><td>
<form name="frmsalle" method="post">
	<b>Choisir la salle :</b>
	<select name="SALLE" onchange="document.frmsalle.submit();">
<?php
	$req = "SELECT sid, snom, snbplaces, smhp, slecteurdvd, stele, slargescreen, sinternet FROM salle ORDER BY snom" ;
	$RSP = mysqli_query($connex, $req) ;
	$NbPlaces = 0 ;
	$MicroHP = 0 ;
	$LecteurDVD = 0 ;
	$Television = 0 ;
	$GrandEcran = 0 ;
	$Internet = 0 ;
	While ($ligne = mysqli_fetch_assoc($RSP)) {
		$lecod = $ligne['sid'] ;
		echo '<option value="'.$lecod.'"' ; 
		if (EstSalleChoisie($lecod)) {
			echo ' selected'; 
			$NbPlaces = $ligne['snbplaces'] ;
			$MicroHP = $ligne['smhp'] ;
			$LecteurDVD = $ligne['slecteurdvd'] ;
			$Television = $ligne['stele'] ;
			$GrandEcran = $ligne['slargescreen'] ;
			$Internet = $ligne['sinternet'] ;
		}
		echo '>'.$ligne['snom']."</option>\n" ;
	}
	mysqli_free_result($RSP) ;
?>
	</select>
</form>

</td>
<td>
<form name="frmprec" method="post">
	<input type="hidden" name="LUNDI" value="<?php $d = getLundi(); $d->sub(new DateInterval('P7D'));  echo $d->format('Y-m-d');?>" />
</form>
<button onclick="document.frmprec.submit();">Semaine Préc</button>
</td>
<td>
<form name="frmsuiv" method="post">
	<input type="hidden" name="LUNDI" value="<?php $d = getLundi(); $d->add(new DateInterval('P7D'));  echo $d->format('Y-m-d');?>" />
</form>
<button onclick="document.frmsuiv.submit();">Semaine Suiv</button>
</td>
</tr>
<tr><td colspan="3">
<div style="border:1px black solid; border-radius:4px; background-color:white; padding:2px;">
<table>
<tr><td style="text-align:right;">Nombre de places : </td><td><?php echo $NbPlaces; ?></td></tr>
<tr><td style="text-align:right;">Télévision : </td><td><?php echo OuiNon($Television); ?></td></tr>
<tr><td style="text-align:right;">Micro &amp; hauts parleurs : </td><td><?php echo OuiNon($MicroHP); ?></td></tr>
<tr><td style="text-align:right;">Lecteur DVD : </td><td><?php echo OuiNon($LecteurDVD); ?></td></tr>
<tr><td style="text-align:right;">Grand écran : </td><td><?php echo OuiNon($GrandEcran); ?></td></tr>
<tr><td style="text-align:right;">Internet : </td><td><?php echo OuiNon($Internet); ?></td></tr>
</table>
</div>
</td></tr>
</table>
<table border="1">
<tr>
	<th>Demi journée</th>
	<th>Lundi</th><th>Mardi</th><th>Mercredi</th><th>Jeudi</th><th>Vendredi</th><th>Samedi</th>
</tr>
<tr><td></td>
<?php
	$LEJOUR = getLundi();
	for ($j=1; $j<7; $j++) {
		echo '<td style="text-align:center;">' ; 
		echo $LEJOUR->format('d M Y')."</td>\n" ;	
		$LEJOUR->add(new DateInterval('P1D'));			
	}
?>
</tr>
<?php
	$libeldemij='MATIN' ;
	$codedemij = 'A' ;
	for ($demij=1;$demij<=2;$demij++) {
		echo '<tr><td>'.$libeldemij.'</td>';
		$LEJOUR = getLundi();
		for ($j=1;$j<7;$j++) {
			echo '<td>' ;
			$tmp='' ;	 
			$req = 'SELECT rcomment, eid, enom FROM res LEFT JOIN empr ON ridempr=eid ' ; 
			$req.= 'WHERE rdate="'.$LEJOUR->format('Y-m-d').'" and rdemij="'.$codedemij.'" and ridsalle="'.$_SESSION['SALLECHOISIE'].'"' ;
			$RSP = mysqli_query($connex, $req) ;
			While ($ligne = mysqli_fetch_assoc($RSP)) {
				echo '<div class="reserv">'; 
				echo '<div class="empr">'.$ligne['enom']; 
				echo ' <span class="suppr" title="Effacer la réservation" onClick="effacerReserv('.$j.', \''.$codedemij.'\');">suppr</span>' ;
				echo '</div>' ;
				echo $ligne['rcomment']; 
				echo '</div>' ;
				break ;
			}
			mysqli_free_result($RSP) ;
			echo "</td>\n" ;
			$LEJOUR->add(new DateInterval('P1D'));	
		}
		echo "</tr>\n" ;
		$libeldemij='APRES MIDI' ;
		$codedemij = 'P' ;
	}
?>
</table>
<div style=" border:1px black solid; background-color:#A0A0A0; ">
<div style="font-size:130%; color:blue;">Enregistrement d'une réservation</div>
<form name="frmajout" method="post">
<table>
<tr><td class="etiq">Choisir le jour :</td>
<td><select name="JOUR">
<?php
	$LEJOUR = getLundi() ;
	for ($i=1; $i<=6; $i++) {
		$tmp = $LEJOUR->format('d M Y');
		echo '<option value="'.$LEJOUR->format('Y-m-d').'">'.$tmp."</option>\n" ;	
		$LEJOUR->add(new DateInterval('P1D'));			
	}
?>
</select></td>
</tr>
<tr><td class="etiq">Choisir la demi-journée : </td>
<td><select name="DEMI"><Option value="A">Matin</option><option value="P">Après midi</option>
</select></td>
</tr>
<tr><td class="etiq">Choisir le réservant :</td>
<td><select name="RES">
<?php
	$req = 'SELECT eid, enom from empr' ;
	$RSP = mysqli_query($connex, $req) ;
	While ($ligne = mysqli_fetch_assoc($RSP)) {
		echo '<option value="'.$ligne['eid'].'">'.$ligne['enom']."</option>\n" ;	
	}
	mysqli_free_result($RSP) ;
?>
</select>
</td></tr>
<tr><td class="etiq">Entrer le texte (html):</td>
<td>
	<textarea name="TXT" rows="5" cols="40" ></textarea>
</td>
</tr>
<tr><td></td><td><input type="submit" value="Enregistrer" /></td></tr>
</table>
</form>
</div>
</body>
</html>
