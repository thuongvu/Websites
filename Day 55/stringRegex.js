// \
// A backslash that precedes a special character indicates that the next character is 
// not special and should be interpreted literally. For example, the pattern /a*/ relies 
// on the special character '*' to match 0 or more a's. By contrast, the pattern /a\*/ 
// removes the specialness of the '*' to enable matches with strings like 'a*'.
	var myRe = /a\*/;
	var myArray = myRe.exec("a*");
	myArray;
	["a*"]

	var myRe = /a*/;
	var myArray = myRe.exec("aaa");
	myArray;
	["aaa"]

	var myRe = /a*/;
	var myArray = myRe.exec("abb");
	myArray;
	["a"]

// ^
// Matches beginning of input. If the multiline flag is set to true, also matches immediately after a line break character.
// For example, /^A/ does not match the 'A' in "an A", but does match the 'A' in "An E".
// The '^' has a different meaning when it appears as the first character in a character set pattern. See complemented character sets for details and an example.

	var myRe = /^A/;
	var myArray = myRe.exec("an A");
	myArray;
	null

	var myRe = /^A/;
	var myArray = myRe.exec("An E");
	myArray;
	["A"]

// $
// Matches end of input. If the multiline flag is set to true, also matches immediately before a line break character.
// For example, /t$/ does not match the 't' in "eater", but does match it in "eat".

	var myRe = /t$/;
	var myArray = myRe.exec("eater");
	myArray;
	null

	var myRe = /t$/;
	var myArray = myRe.exec("eat");
	myArray;
	["t"]


// *
// Matches the preceding character 0 or more times.
// For example, /bo*/ matches 'boooo' in "A ghost booooed" and 'b' in "A bird warbled", 
// but nothing in "A goat grunted".

	var myRe = /bo*/;
	var myArray = myRe.exec("booooo");
	myArray;
	["booooo"]

	var myRe = /bo*/;
	var myArray = myRe.exec("a bird");
	myArray;
	["b"]
		// see, with that one, if a word starts with a b... then it's matched with this
		// it doesnt have to be b...o...*.. it just happens to be anything that follows
		// first letter b... if it matches the second condition, o or not, doesnt matter

	var myRe = /bo*/;
	var myArray = myRe.exec("a box");
	myArray;
	["bo"]

// +
// Matches the preceding character 1 or more times. Equivalent to {1,}.
// For example, /a+/ matches the 'a' in "candy" and all the a's in "caaaaaaandy".
	var myRe = /a+/;
	var myArray = myRe.exec("caaandy bar");
	myArray;
	["aaa"]

	var myRe = /a+/;
	var myArray = myRe.exec("a caaandy bar");
	myArray;
	["a"]
		// but then, with this one, it only matches the first instance of a+ it sees
		// doesn't get caaandy

	var myRe = /a+/;
	var myArray = myRe.exec("bar");
	myArray;
	["a"]
		// note that it we never get the a in bar until its the first instance



// Matches the preceding character 0 or 1 time. Equivalent to {0,1}.
// For example, /e?le?/ matches the 'el' in "angel" and the 'le' in "angle" and also the 'l' in "oslo".
// If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the fewest possible characters), as opposed to the default, which is greedy (matching as many characters as possible). For example, applying /\d+/ to "123abc" matches "123". But applying /\d+?/ to that same string matches only the "1".
// Also used in lookahead assertions, as described in the x(?=y) and x(?!y) entries of this table.

	var myRe = /e?le?/;
	var myArray = myRe.exec("angel");
	myArray;
	["el"]
			// with this, it says.. e? 0 or 1 times
			// l, must match 1 time
			// e after the l?  0 or 1 times
	var myRe = /e?le?/;
	var myArray = myRe.exec("angle");
	myArray;
	["le"]

	var myRe = /e?le?/;
	var myArray = myRe.exec("oslo");
	myArray;
	["l"]
			// there we see only the l MUST be a match of 1

	var myRe = /\d?/;
	var myArray = myRe.exec("123abc");
	myArray;
	["1"]		
			// makes it non-greedy now
			
	var myRe = /\d+/;
	var myArray = myRe.exec("123abc");
	myArray;
	["123"]
			// eg without it
	var myRe = /\d{0,1}/;
	var myArray = myRe.exec("123abc");
	myArray;
	["1"]
			// same thing as {0,1}

















