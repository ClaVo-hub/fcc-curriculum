Step 1: Establish the HTML Boilerplate

To start your project, you need a basic HTML structure.
• Create a standard boilerplate with the document type declaration, an html wrapper set to English, a head block, and a body block.
• Set your metadata tag encoding format to support standard universal characters.
• Give the project a document title.
• Link your local stylesheet file in the head, and link your script file right before the closing body tag.

Step 2: Build the UI Elements

Inside the main landmark section of your body, you need a dedicated input area where users can type messages to test against your filter.
• Create a label element with a specific relationship matching attribute. Inside, add descriptive text indicating a message input field.
• Directly below it, add a text area element. Configure its identity and name matching attributes to link directly with your label. Set its default placeholder text, default visible text rows, and default visible character column width.
• Create a button below the text area. Give it an identifier attribute and explicit text directing the user to check their message.
• Add an empty paragraph element with a unique identification attribute right below the button to display your outcome results.

Step 3: Global DOM Selection Variables

Open your script file. Before writing any validation logic, you must capture your active elements so your code can interact with the user interface.
• Declare a constant variable and assign it the DOM reference of your text area element.
• Declare a constant variable and assign it the DOM reference of your paragraph element.
• Declare a constant variable and assign it the DOM reference of your verification button.

Step 4: The First Pattern — Flagging Help Requests

Spam often contains urgent pleas for assistance. You need to flag phrases matching phrases requesting help or assistance.
• Declare a constant variable and assign it a regular expression literal.
• Construct the pattern to scan for the primary key phrase or an alternative secondary phrase.
• Append an evaluation flag to the end of your pattern literal to ensure it captures these words regardless of character casing.

Step 5: The Second Pattern — Flagging Fake Wealth

Next, you need to target messages mentioning massive monetary values, which often accompany scam pitches.
• Declare a constant variable and assign it a regular expression literal.
• Use a numeric digit selector followed by an addition quantifier to detect any sequence of numbers.
• Follow the digits with a whitespace selector allowing optional spacing.
• Use a non-capturing structural group containing alternation separators to check for various large numeric value names.
• Allow an optional plural modifier character after your group, and ensure the entire pattern is case-insensitive.

Step 6: The Third Pattern — Character Substituted "Free Money"

Spammers try to trick basic keywords filters by swapping letters out for numbers.
• Declare a constant variable and assign it a regular expression literal.
• Use boundary matching logic to handle character spacing or the beginning of an evaluation block.
• Construct the target keyword "free" using custom letter alternate brackets to catch vowel variations. Ensure you explicitly define two matching letter choice configurations side-by-side for the double vowel sequence.
• Add standard literal text characters to match the middle transition letters of your target words.
• Map out the final sections of the word "money" using appropriate bracketed substitutions for the remaining vowel characters.
• End the pattern ensuring it evaluates a closing word boundary or the end of the input string.

Step 7: The Fourth Pattern — Catching Stock Schemes

Pump-and-dump stock scams often contain symbols, numbers, and letter variations spelling out stock opportunities.
• Declare a constant variable and assign it a regular expression literal.
• Target a word string representing a market stock keyword. Replace your standard text characters with appropriate alphanumeric alternative choice brackets.
• Account for potential bracket typos or intentional character insertions when configuring your final consonant letters.
• Apply boundary anchors to ensure it isolates whole word structures.

Step 8: The Fifth Pattern — Obfuscated "Dear Friend"

The final pattern aims to capture common opening sales traps, specifically focusing on the greeting phrase "dear friend".
• Declare a constant variable and assign it a regular expression literal.
• Set up a whole-word lookbehind boundary string anchor configuration.
• Map out the characters for the word "dear", replacing standard vowel letters with numeric and special character variation brackets.
• Add a spacing quantifier to allow for spaces, then map out the word "friend" using matching selection brackets for its internal vowel patterns.
• End the expression with whole-word boundary captures.

Step 9: Assembling the Deny List Matrix

Now that your individual regular expressions are crafted, you need to group them together.
• Create a new constant array variable.
• Populate this array with references to all five of your regular expression variables in order.

Step 10: Building the Evaluation Engine

With your array ready, you need a high-order verification function to dynamically cross-reference user input against your pattern inventory.
• Define an arrow function that accepts a single argument string parameter representing the message text.
• Inside the function body, utilize an array iteration method that checks if at least one item satisfies a condition.
• For each individual regular expression processed by the iterator, execute its native string validation method against the input parameter.

Step 11: Triggering UI Updates on Interaction

The final step hooks your engine up to your user interface button.
• Attach a standard user click action listener to your button constant element.
• Inside the listener callback, perform an input evaluation: if the text area value is completely blank, trigger a native browser notification prompt and stop function execution.
• If text is present, run your high-order evaluation function on the text area input value.
• Use a conditional selector statement to update the paragraph element text content: display a warning message if your validation system returns true, and display a clean status confirmation message if it returns false.

Spam Filter Test Suite Instructions

To test your local implementation, enter each sample text block below into your <textarea> and click your "Check message" button.

Test Category 1: Clean Messages (Should pass validation)

• Test Case 1.1: Hello! Are we still meeting for lunch at the cafeteria today at 1 PM?
• Expected Result: Displays "This message does not seem to contain any spam."
• Test Case 1.2: Can you please send over the stock inventory reports from last quarter? Thanks.
• Expected Result: Displays "This message does not seem to contain any spam."

Test Category 2: Urgency & Help Triggers (Flags helpRegex)

• Test Case 2.1: Urgent alert! PLEASE HELP me resolve my locked account immediately.
• Expected Result: Displays "Oh no! This looks like a spam message."
• Test Case 2.2: Kindly assist me with transferring funds out of this temporary holding file.
• Expected Result: Displays "Oh no! This looks like a spam message."

Test Category 3: Fake Wealth Triggers (Flags dollarRegex)

• Test Case 3.1: Congratulations! Your profile was chosen to receive 500 million dollars today!
• Expected Result: Displays "Oh no! This looks like a spam message."
• Test Case 3.2: You have won over 50 thousand cash rewards. Claim your prize inside.
• Expected Result: Displays "Oh no! This looks like a spam message."

Test Category 4: Obfuscated Text Triggers (Flags freeRegex, stockRegex, & dearRegex)

• Test Case 4.1: Get your fr33 m0n3y right here by clicking this unverified link!
• Expected Result: Displays "Oh no! This looks like a spam message."
• Test Case 4.2: HOT NEW ST0C[k ALERT! Buy into this asset before the market closes tonight.
• Expected Result: Displays "Oh no! This looks like a spam message."
• Test Case 4.3: D3@r fr13nd, I am writing to share a unique business opportunity with you.
• Expected Result: Displays "Oh no! This looks like a spam message."
