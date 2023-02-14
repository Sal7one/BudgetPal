
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 firstname VARCHAR(100) NOT NULL,
 lastname VARCHAR(100) NOT NULL,
 password_digest VARCHAR(100) NOT NULL
 );

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  image_url text NOT NULL,
  published timestamp default current_timestamp
);



 CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id integer REFERENCES categories(id),
  user_id     integer REFERENCES users(id),
  item_name VARCHAR(255) NOT NULL,
  item_price float NOT NULL, 
  bought timestamp default current_timestamp
);


insert into categories (category_name) VAlUES ('Food');
insert into categories (category_name) VAlUES ('Transportation');
insert into categories (category_name) VAlUES ('Entertainment');
insert into categories (category_name) VAlUES ('Utilities');
insert into categories (category_name) VAlUES ('Medical & Healthcare');
insert into categories (category_name) VAlUES ('Investing and Savings');
insert into categories (category_name) VAlUES ('Insurance');
insert into categories (category_name) VAlUES ('Housing');
insert into categories (category_name) VAlUES ('Miscellaneous');

insert into articles (title, body, image_url) VAlUES ('Inflation is high world wide what to do?', ' Idk Go buy some land or something ', 'https://images.unsplash.com/photo-1621378864046-0122e4a415a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'); 
insert into articles (title, body, image_url) VAlUES ('An Article with no image from the author', ' Go buy some land or something I dont know ', ''); 
insert into articles (title, body, image_url) VAlUES ('An aritcle with a broken Image! ', 'Thanks for reading!', 'https://www.google.com/salehonepics.jpg'); 
insert into articles (title, body, image_url) VAlUES ('Budgeting 101: How to Budget Money', 'If I have take-home pay of, say, $2,000 a month, how can I pay for housing, food, insurance, health care, debt repayment and fun without running out of money? That’s a lot to cover with a limited amount, and this is a zero-sum game.\nThe answer is to make a budget.\nWhat is a budget? A budget is a plan for every dollar you have. It’s not magic, but it represents more financial freedom and a life with much less stress. Here’s how to set up and then manage your budget.\nHow to budget money\nCalculate your monthly income, pick a budgeting method and monitor your progress.\nTry the 50/30/20 rule as a simple budgeting framework.\nAllow up to 50% of your income for needs.\nLeave 30% of your income for wants.\nCommit 20% of your income to savings and debt repayment.\nTrack and manage your budget through regular check-ins.\nUnderstand the budgeting process\nFigure out your after-tax income: If you get a regular paycheck, the amount you receive is probably it, but if you have automatic deductions for a 401(k), savings, and health and life insurance, add those back in to give yourself a true picture of your savings and expenditures. If you have other types of income — perhaps you make money from side gigs — subtract anything that reduces it, such as taxes and business expenses.\nChoose a budgeting plan: Any budget must cover all of your needs, some of your wants and — this is key — savings for emergencies and the future. Budgeting plan examples include the envelope system and the zero-based budget.\nTrack your progress: Record your spending or use online budgeting and savings tools.\nAutomate your savings: Automate as much as possible so the money you’ve allocated for a specific purpose gets there with minimal effort on your part. An accountability partner or online support group can help, so that youre held accountable for choices that blow the budget.\nPractice budget management: Your income, expenses and priorities will change over time, so actively manage your budget by revisiting it regularly, perhaps once a quarter. If youre struggling to stick with your plan, try these budgeting tips.', 'https://plus.unsplash.com/premium_photo-1667520477159-e8947dcc83e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80');