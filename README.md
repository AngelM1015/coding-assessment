## RUN NPM INSTALL & NPM START

### 1.	I have create a JSON file that contains the seed data, that is, an array of objects. Each object contains two properties, an ID and a 		Name. I have put 20 objects in the array for testing and development.

### 2.	In beginning of the index.js, I am setting up the ExpressJS and a single POST route at /apps that would receive the incoming post 			request with body parameters.

### 3.	I am using require statement in index.js file to bring the JSON data into a variable called the data.

### 4.	Handing the POST request

#### a.	In the /app POST route, first I am checking the validation of the incoming data and returning the appropriate response message 		if there is a validation problem.

#### b.	Then I am extracting the by, max and order parameters and if max is even greater than the page size, then setting the max equal 	to page size.

#### c.	Then, I’m creating two variables that would come handy in upcoming logic

#### d.	Then, I’m checking if the by parameter is ID or Name, because upcoming logic depends on it

#### e.	If by equals ID

##### i.	I’m extracting the start and end parameter values and if start is greater than end then I’m returning the empty array because the parameters are not valid
##### ii.	Then I’m finding the array index of starting and ending parameter and adding 1 in ending because the slice method does not include the ending index
##### iii.	Then I’m slicing the data on found indexes and if the max parameter is lesser then the results we found, then slicing the data again to match the length with max parameter
##### iv.	Then, sorting the data depending on the order parameter
##### v.	Finally return the sorted array in response to the request

#### f.	If by equals Name
##### i.	Logic is same as for ID with following changings
##### ii.	I’m not converting the start and end into inter types because these would be strings this time
##### iii.	I’m using different JS function for sorting



## Give a POST req to: http://localhost:3000/apps/ of example found bellow to test:
 
```
{
	"range": {
		"by":"id",
		"start":1,
		"end":20,
		"max":4,
		"order":"asc"
	}	
}
```


