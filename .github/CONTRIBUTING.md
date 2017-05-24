# Contributing to `eslint-plugin-swagger`

We're inner source and we encourage your contributions! Contributions include:

1. Reporting defects (aka "bugs")
2. Working on [`Status: Available` issues][label-status-available-url]
3. Adding detailed comments, documentation, or suggestions to [`Open` issues][open-issues-url]
4. [Requesting new features or enhancements][new-issue-url]
5. [Submitting pull requests (PRs)][pr-url]

## 1. Create an issue to begin collaboration

> :white_check_mark: Contributions start with clear communication, and issues – not e-mails! – are the best way to collaborate with colleagues.
>
> Besides, whenever you save a comment or an edit to an issue, the right stakeholders will be notified.

Think of issues communal to-do list. If you notice something wrong, toss an issue in and collaborate to determine when -- or whether -- it will be resolved.

### 1.1. Defect (aka "bug") issues

> #### 🏷️  `Type: Defect` reports
> If you believe you've encountered a defect -- aka a _bug_ -- letting us know about it is a *huge* contribution. You can help by adding the following information as best you can.


1.1.1. Screenshots with a description showing the problem.<br>
1.1.2. Console or server logs<br>
1.1.3. Contact information of users who experienced this request<br>
1.1.4. The time of the bug so that relevant logs can be found

The following things should always be included:

1.1.5. Enumerated steps to reproduce the issue<br>
1.1.6. What happened when you followed those steps<br>
1.1.7. What you expected to happen that didn't

### 1.2. Feature Issues (aka, "Stories")

> #### 🏷️  `Type: Feature` requests
> Share what you'd like improved, or even new features that would make your life easier.


If you'd like to see a new feature or enhancement:

1.2.1. Open a new Issue.<br>
1.2.2. Uncomment the "User Story" sections in the pre-populated issue template.

#### Sample user story entry

> ## User story
> As a `role`,
> I must/need/want/should `do something`
> In order to `achieve business value`.

> ## Acceptance criteria
> 1. <br>
> 2. <br>
> 3. <br>
> 4. <br>

### 1.3. Issue labels

Selecting accurate label(s) communicates vital information about an issue.

#### 1.3.1. Labels by `Type` defined

> #### :information_source: `Type` labels and Git commit conventions
> This project enforces _[AngularJS Git Commit Guidelines][git-commit-guidelines-url]_ with [`commitplease`][commitplease-url] pre-commit hooks. This not only encourages succinct change logs, but also enables automated release management with [`semantic-release`][semantic-release-url].

##### 1.3.1.1. 🏷️  `Type: Build`

Issues related to product builds. The AngularJS Git commit message format is

```

build(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.2. 🏷️  `Type: Chore`

Issues related to miscellaneous non-functional changes (usually "maintenance" changes). The AngularJS Git commit message format is

```

chore(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.3. 🏷️  `Type: CI`

Issues related to continuous integration, delivery, and deployment tasks. The AngularJS Git commit message format is

```

ci(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.4. 🏷️  `Type: Docs`

Issues related to continuous integration, delivery, and deployment tasks. The AngularJS Git commit message format is

```

ci(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.5. 🏷️  `Type: Feature`

New feature or enhancement requests. The AngularJS Git commit message format is

```

feat(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.6. 🏷️  `Type: Fix`

Defect (bug) repair issues. The AngularJS Git commit message format is

```

fix(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.7. 🏷️  `Type: Performance`

Performance improvement issues. The AngularJS Git commit message format is

```

perf(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.8. 🏷️  `Type: Refactor`

Source code design **improvements that do not affect product behavior**. The AngularJS Git commit message format is

```

refactor(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.9. 🏷️  `Type: Revert`

Tasks that revert to a previous commit hash. The AngularJS Git commit message format is

```

revert(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.10. 🏷️  `Type: Style`

Issues related to style guideline compliance, especially `ESLint` errors and warnings. The AngularJS Git commit message format is

```

style(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

##### 1.3.1.11. 🏷️  `Type: Test`

Test coverage tasks. The AngularJS Git commit message format is

```

test(<scope>): <subject>
<BLANK LINE>
<[body]>
<BLANK LINE>
<footer>
```

## 2. Assignees

### 2.1. Responsibilities
Assignees are responsible for completing an issue. Do not assign a person to an issue unless they agree to it.

### 2.2. Self-assignment is good!
Assign the issue to yourself or a willing and capable colleague! You can always clone the develop branch and issue a pull request to queue a code review.

### 3. Planning

#### 3.1. Milestones
The creation of new milestones is by group consensus only. Don't do it on your own.

#### 3.2. Due dates
A milestone with a due date should have a "responsible person" listed in the description. That doesn't mean that person is the sole person to work on it, just that they're the one responsible for coordinating efforts around that chunk of work.
Once a milestone has a due date, only issues okay'd by the responsible person can be added. This ensures that a chunk of work can be delivered by the promised due date.

## 4. Prioritization
Issues require real people who balance work and life to review your issue, so don't label issues as "High" or greater unless they really apply.

"I want this new feature now" does not qualify as important. Generally, these labels should only be applied by people setting up a batch of work.
Abusing priority labels only make the "Priority" meaningless.

### 4.1. Recommendations for determining priority
Some good ways to make your issue isn't overlooked include:
Appropriate labeling.
A meaningful and succinct summary. E.g., if this is a browser bug, add the "browser" label, and prefix your issue title with the browser version and the URL you encountered the problem on. e.g. "IE 9: /wisps/xxx can't click on the search input"
Screenshots are always handy.

### 4.2. Make sure your issue doesn't already exist
Please scan the Backlog and active sprint for similar issues.
If your issue is urgent, there might well be a "Hotfix" created already.

If you find your issue has already been reported, let your voice be heard!
Vote for the issue
Add meaningful comments to the existing issue
"LIke" the issue to show your support.

## 5. Developing

### 5.1. Follow appropriate style guidelines

> TODO: list common style guidelines here.

### 5.2. Test your code

Write specs (i.e., unit tests). Behavior-driven development specifications are executable documentation. By the way, 100% code coverage is the norm, not the exception. :thumbs up:

### 5.3. Write _meaningful_ commit messages
Above all else, source code repositories communicate change to your colleagues and your future self! Therefore, please

#### 5.3.1. Write _consistent_ with commit messages

Write meaningful commit messages that conform to the Angular conventional changelog preset.

Keep them somewhat short and meaningful. Commit messages like “meh”, “fix”, “lol” and so on are useless. Your are writing to your future self and everyone else. It’s important to be able to tell what a commit is all about from its message.

We use the Angular conventional changelog preset because it:
Formats commit messages in a predictable, consumable way
Allows us to automate updates to the product's CHANGELOG, which is as vital to communicating change as it is impossible for humans to do by hand.

Thank you for contributing, and welcome to the community!

## 6. Related articles

Related articles appear here based on the labels you select. Click to edit the macro and add or change labels.

[commitplease-url]: https://www.npmjs.com/package/commitplease
[git-commit-guidelines-url]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit
[label-status-available-url]: ../labels/Status%3A%20Available
[new-issue-url]: ../issues/new
[open-issues-url]: ../issues
[pr-url]: ../pulls
[semantic-release-url]: https://github.com/semantic-release/semantic-release
