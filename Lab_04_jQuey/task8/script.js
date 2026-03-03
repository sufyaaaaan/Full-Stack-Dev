$(document).ready(function () {
    const quizData = [
        {
            question: "What does DOM stand for?",
            options: ["Document Object Model", "Data Object Model", "Dynamic Orientation Model"],
            correctAnswer: 0
        },
        {
            question: "Which jQuery method is used to hide selected elements?",
            options: ["hide()", "visible(false)", "display(none)"],
            correctAnswer: 0
        },
        {
            question: "How do you select all <p> elements inside a <div> using jQuery?",
            options: ["$('div p')", "$('div.p')", "$('p > div')"],
            correctAnswer: 0
        },
        {
            question: "Which built-in method adds UI events directly using jQuery UI?",
            options: ["sortable()", "draggable()", "Both A and B"],
            correctAnswer: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const $questionText = $('#question-text');
    const $optionsContainer = $('#options-container');
    const $nextBtn = $('#next-btn');
    const $currentNum = $('#current-question-num');
    const $totalNum = $('#total-questions');

    function initQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        $totalNum.text(quizData.length);
        $('#result-block').hide();
        $('#quiz-block').show();
        loadQuestion();
    }

    function loadQuestion() {
        // Effects & Animations for transition
        $('#quiz-block').fadeOut(200, function () {
            const currentQ = quizData[currentQuestionIndex];

            // DOM Manipulation
            $currentNum.text(currentQuestionIndex + 1);
            $questionText.text(currentQ.question);

            $optionsContainer.empty();
            $nextBtn.prop('disabled', true);

            currentQ.options.forEach((option, index) => {
                const $btn = $('<button></button>')
                    .addClass('option-btn')
                    .text(option)
                    .data('index', index);
                $optionsContainer.append($btn);
            });

            $(this).fadeIn(300);
        });
    }

    // Event Handling with Element Delegation
    $optionsContainer.on('click', '.option-btn', function () {
        // If question already answered, ignore
        if ($optionsContainer.find('.correct, .incorrect').length > 0) return;

        const currentQ = quizData[currentQuestionIndex];
        const selectedIndex = $(this).data('index');
        const correctIndex = currentQ.correctAnswer;

        // CSS Manipulation for UI feedback
        $('.option-btn').removeClass('selected');
        $(this).addClass('selected');

        if (selectedIndex === correctIndex) {
            $(this).removeClass('selected').addClass('correct');
            score++;
        } else {
            $(this).removeClass('selected').addClass('incorrect');
            // Highlight the correct one
            $optionsContainer.find('.option-btn').eq(correctIndex).addClass('correct');
        }

        $nextBtn.prop('disabled', false);
    });

    $nextBtn.on('click', function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        $('#quiz-block').fadeOut(400, function () {
            $('#score-display').text(`${score} / ${quizData.length}`);
            $('#result-block').fadeIn(400);
        });
    }

    $('#restart-btn').on('click', function () {
        initQuiz();
    });

    // Start
    initQuiz();
});
