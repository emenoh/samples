<?php
/*
Template Name: Open House Listing Template
*/

require($_SERVER["DOCUMENT_ROOT"].'/config.php');

get_header(); //WordPress header





/*

ADDING AN ADDITIONAL FIELD FOR SEARCH requires:
  1. adding a join
  2. adding a where statement
  3. updating $trailing_vars
  4. updating edit-search 

*/



//AGENT PROPERTIES agent ID

$agentMLS = $pagent['agent_id'];
//echo $agentMLS;


$status = "'Active','Backup Offers','Pending Sale'";

?>

<div id="pageBody">
	<div id="contentUpper">
		<div id="pageMarker">
			<div class="parentBtn">
				<?php
			if($post->post_parent != 0) {
				$parent_title = get_the_title($post->post_parent);
				echo $parent_title; 
			}
			else {
				echo the_title();
			}
			?>
		</div>
		<?php 
	if($post->post_parent != 0){
		?>
		<div class="pageName">
			<?php the_title(); ?>
		</div>
		<?php }else{ ?>
			<div class="pageName">SoCal MLS Listing Search</div>
			<?php } ?>
		</div>
	</div>
	<div id="blueHolder" class="clearfix">
		<div id="contentLower" class="clearfix">
			<!--Content Start-->
			<table cellspacing="0" cellpadding="0" border="0">
				<tr>
					<td id="colLeft">
					
<?php

          //GET PROPERTY SEARCH VARIABLES 
          //db_connection
					mysql_connect($hostname_connection_mls, $username_connection_mls, $password_connection_mls) or trigger_error(mysql_error(),E_USER_ERROR);
					mysql_select_db("$db_mls") or die(mysql_error());


//Get Open House Dates
//$date = date("Y-m-d H:i:s");
//echo $date;

$OHdate = date("Y-m-d H:i:s");


//$query_for_openHouse = "SELECT * FROM idx_openHouse WHERE InputId = '".$agentMLS."' AND CONVERT(InputTo,signed) <= '".$date."' ";
$query_for_openHouse = "SELECT * FROM idx_openHouse WHERE InputId = '".$agentMLS."' AND type = 'public' AND toDate > str_to_date('".$OHdate."', '%Y-%m-%d %H:%i')  ";

$openHouse_dates = mysql_query($query_for_openHouse);

$openHouseIDs = "";

while($OHrow = mysql_fetch_array( $openHouse_dates )) {
$openHouseIDs .= "'".$OHrow['tableUid']."',";
//echo $OHrow['description'] . "<br />";
//echo $OHrow['tableUid'] . "<br />";
//echo $OHrow['fromDate'] . "<br />";
//echo $OHrow['toDate'] . "<br /><br /><br />";

}
$openHouseIDs = substr_replace($openHouseIDs ,"",-1);
//echo $openHouseIDs . "<br /><br /><br />";


//Get Properties
					// set page number
					$pagenum=$_REQUEST['pagenum'];
					if (!(isset($pagenum))) {
						$pagenum = 1;
					} 
					if ($pagenum == "undefined") {
						$pagenum = 1;
					}

					if($page_rows == "" || $page_rows == "undefined"){
						$page_rows = 10;
					}

					$max = ($pagenum-1)*10; 

					//Query grabs all rows to collect row count
					$query_for_row_count = "SELECT DISTINCT Price.listingsdb_id, Price.listingsdbelements_field_value, Status.listingsdbelements_field_value FROM or_en_listingsdbelements as Price ";
					//----- for purposes of View All Listings & Featured Properties
					//add Open House join
					$query_for_row_count .= "JOIN or_en_listingsdbelements as OpenHouse ON Price.listingsdb_id = OpenHouse.listingsdb_id "; 
					  //add Agent Join
					//$query_for_row_count .= "JOIN or_en_listingsdbelements as AGENTID ON Price.listingsdb_id = AGENTID.listingsdb_id "; 
					
					$query_for_row_count .= "JOIN or_en_listingsdbelements as Status ON Price.listingsdb_id = Status.listingsdb_id "; 


					$query_for_row_count .= "WHERE ";
					

          
          //agent id
          //agent_id
          $query_for_row_count .= "OpenHouse.listingsdbelements_field_name = 'TableUid' AND OpenHouse.listingsdbelements_field_value  IN (" . $openHouseIDs . ") AND ";
          
          //$query_for_row_count .= "AGENTID.listingsdbelements_field_name = 'ListAgentID' AND AGENTID.listingsdbelements_field_value = '" . $agentMLS . "' AND ";
          
          

          
			//Price comparison is made
			$query_for_row_count .= "Price.listingsdbelements_field_name = 'price' AND CONVERT(Price.listingsdbelements_field_value,signed) >= '0' AND CONVERT(Price.listingsdbelements_field_value,signed) <= '999999999999' ";
				
       
					//status is checked

					if($status != ""){
						$query_for_row_count .= "AND ";
						$query_for_row_count .= "Status.listingsdbelements_field_name = 'status' AND Status.listingsdbelements_field_value IN ( $status ) ";
					}




					//default price order is DESCENDING
					$price_extension = "ABS(Price.listingsdbelements_field_value) DESC ";
					
					$query_for_offset = $query_for_row_count . "ORDER BY Status.listingsdbelements_field_value ASC, $price_extension LIMIT $page_rows OFFSET $max";

					//TO DEBUG QUERY, UNCOMMENT NEXT 2 LINES
					//echo $query_for_offset;
					//exit;

					$data = mysql_query($query_for_offset);
					$data_row_count = mysql_query($query_for_row_count);

					$rows = mysql_num_rows($data_row_count);

					//for cities and status and amenities and views to be passed into array again for pagination,
					//single quotes must be erased and string value must be 
          //passed as a valid URL 
          


					echo "<div id='listingBox'>";
					echo "<div id='heading'>";

					//Pagination
					echo "<div class='heading'>";
				if($rows > 0){
				echo "<p>There ";
				if($rows >1){
				echo "are ". $rows ." properties listed.";
				}else{
				echo "is 1 property listed.";
				}
				echo "</p>";
				}
				

					$last = ceil($rows/$page_rows); 
if ($rows > 10) {//only show if pagination required
					echo "<p> Page $pagenum of $last </p>"; 

					if ($pagenum < 1) {
						$pagenum = 1;
					}
					elseif ($pagenum > $last) {
						$pagenum = $last;
					}
}

					//container for pagination AND sort options
					echo "<div id='header-bottom-row'>";

if ($rows > 10) {//only show if pagination required
					//pagination links
					$previous = $pagenum-1;
					$next = $pagenum+1;
										
					$firstLink = "<a style='text-decoration: underline;' href='{$_SERVER['new-advanced-search-results']}?pagenum=1$trailing_vars'>&lt;&lt; First</a>";

					$previousLink = "<a style='text-decoration: underline;' href='{$_SERVER['new-advanced-search-results']}?pagenum=$previous$trailing_vars'>&lt; Previous</a>";

					$nextLink = "<a style='text-decoration: underline;' href='{$_SERVER['new-advanced-search-results']}?pagenum=$next$trailing_vars'>Next &gt</a>";

					$lastLink = "<a style='text-decoration: underline;' href='{$_SERVER['new-advanced-search-results']}?pagenum=$last$trailing_vars'>Last &gt;&gt;</a>";

					echo "<div id='pagination' style='float: left'>";

					if($pagenum == 1) {
						echo "&lt;&lt; First &nbsp;&lt; Previous &nbsp;&nbsp;| &nbsp;&nbsp;$nextLink &nbsp;$lastLink";
					}
					else if($pagenum == $last) {
						echo "$firstLink &nbsp;$previousLink &nbsp;&nbsp;| &nbsp;&nbsp;Next &gt; &nbsp;Last &gt;&gt;";
					}
					else {
						echo "$firstLink &nbsp;$previousLink &nbsp;&nbsp;| &nbsp;&nbsp;$nextLink &nbsp;$lastLink";
					}
					echo "</div>";
}//end of pagination check


				//Fixes spatial explosion in IE6
				echo "&nbsp;</div>";
				
				echo "<div style='clear: both;'></div>";
	if ($rows != 0) {

				//BEGIN: results set
				while($row = mysql_fetch_array( $data )) {
					//Listing Values
					$image = mysql_query("SELECT listingsimages_file_name FROM or_en_listingsimages WHERE listingsdb_id=".$row['listingsdb_id']." ORDER BY listingsimages_rank ASC LIMIT 1");
					$city = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='city' AND listingsdb_id=".$row['listingsdb_id']);
					$address = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='address' AND listingsdb_id=".$row['listingsdb_id']);
					$beds = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='beds' AND listingsdb_id=".$row['listingsdb_id']);
					$baths = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='baths' AND listingsdb_id=".$row['listingsdb_id']);
					$price = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='price' AND listingsdb_id=".$row['listingsdb_id']);
					$status = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='status' AND listingsdb_id=".$row['listingsdb_id']);
					$conditions = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='conditions' AND listingsdb_id=".$row['listingsdb_id']);
					$propDescription = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='propertyDescription' AND listingsdb_id=".$row['listingsdb_id']);
					$mls = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='mls' AND listingsdb_id=".$row['listingsdb_id']);
					$modified = mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='modified' AND listingsdb_id=".$row['listingsdb_id']);
					$listingID = $row['listingsdb_id'];
					$tableUidData =  mysql_query("SELECT listingsdbelements_field_value FROM or_en_listingsdbelements WHERE listingsdbelements_field_name='tableUid' AND listingsdb_id=".$row['listingsdb_id']);
					while($row = mysql_fetch_array($tableUidData)) {
							$tableUid = $row['listingsdbelements_field_value'];
					}
					

					$OpenHouseDate_Query = "SELECT * FROM idx_openHouse WHERE tableUid = '".$tableUid."' AND toDate > str_to_date('".$OHdate."', '%Y-%m-%d %H:%i')  ";
					//echo $OpenHouseDate_Query;
					
					$OpenHouseData = mysql_query($OpenHouseDate_Query);
										

					echo "<div class='listingOff'>";
					
					if (mysql_num_rows($image) == 0) { 
						echo "<div class='listCol1' style='width: 100px; height: 75px; line-height: 75px; color: #FFF; background: #CCC; text-align: center;'>No Image</div>";
					} 
					else {

						while($row = mysql_fetch_array($image)) {
							echo "<div class='listCol1'>";
							echo "<a href=\"/new-details-page/?listingID=".$listingID."\"><img src=\"http://realestate.brilliantone.com/or/images/listing_photos/".$row['listingsimages_file_name']."\" width=\"100\" height=\"65\"/></a>";
							echo "</div>";
						} 
					}

					echo "<div class='listCol2'>";

					while($row = mysql_fetch_array($city)) {
						echo '<strong>' . preg_replace('`\([a-z ]+\)`i','',$row['listingsdbelements_field_value']) . '</strong>' . "<br>\n";
					}
					while($row = mysql_fetch_array($address)) {
						echo $row['listingsdbelements_field_value']."<br>\n";

					}
					
					
					while($row = mysql_fetch_array($mls)) {
						echo "MLS# ".$row['listingsdbelements_field_value']."<br>\n";

					}


					/*
					while($row = mysql_fetch_array($propDescription)) {
					if($row['listingsdbelements_field_value'] != ""){
					echo "Property Description: ". preg_replace("(\|\|)",",",$row['listingsdbelements_field_value']) . "<br>\n";
					}
					}
					*/
					echo "</div>";


					while($row = mysql_fetch_array($beds)) {
						echo "<div class='listCol3'>";
						echo $row['listingsdbelements_field_value'] . " \n Beds ";
					}
					while($row = mysql_fetch_array($baths)) {
						echo $row['listingsdbelements_field_value'];
					}
					echo " Baths <br>\n";
					while($row = mysql_fetch_array($price)) {
						echo "Offered  at  $" .  number_format($row['listingsdbelements_field_value']) . "<br>\n";

					}

					while($row = mysql_fetch_array($conditions)) {
						if($row['listingsdbelements_field_value'] != "Standard Sale/None"){
							echo "Special Conditions: ". preg_replace("(\|\|)",",",$row['listingsdbelements_field_value']) . "<br>\n";
						}
					}
					
					echo "<br><strong>Current Open House Dates and Times: </strong><br><br>";
					while($row = mysql_fetch_array($OpenHouseData)) {
							//echo $row['description'];
							echo date_format(date_create($row['fromDate']), 'M jS, Y');
							echo " From: ". date_format(date_create($row['fromDate']), 'h:i A') ." - ";
							echo "To: ". date_format(date_create($row['toDate']), 'h:i A');
							echo "<br><br>\n";
					}

					echo "</div>";

					echo "<div class=\"listCol5\"><a href=\"/new-details-page/?listingID=".$listingID."\">";
					echo "<img src='/wp/wp-content/themes/realestate/images/btn_view_details.jpg' class='btn' /></a></div>";
					
					echo "</div>";
				}
				
					}else{//end of no results check

						echo "Sorry, there are currently no Open Houses scheduled.<br><br>";
						
						}
						
						
				echo "</div>";

				?>

			</td>
			<!--Search Content End-->
		</tr>
	</table>
</div><!--contentLower End-->
</div><!--blueHolder End-->
</div><!--pageBody End-->


<?php get_footer(); ?>
