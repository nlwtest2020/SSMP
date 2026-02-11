// Interactive Learning Course App
class CourseApp {
  constructor() {
    this.config = null;
    this.currentSectionIndex = 0;
    this.currentQuestionIndex = 0;
    this.quizAnswers = {};
    this.init();
  }

  async init() {
    await this.loadConfig();
    this.buildProgressBar();
    this.renderCurrentSection();
  }

  async loadConfig() {
    try {
      const response = await fetch('course-config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Failed to load course configuration:', error);
    }
  }

  buildProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.innerHTML = '';

    this.config.course.sections.forEach((_, index) => {
      const step = document.createElement('div');
      step.className = 'progress-step';
      step.id = `progress-${index}`;
      progressBar.appendChild(step);
    });

    this.updateProgress();
  }

  updateProgress() {
    this.config.course.sections.forEach((_, index) => {
      const step = document.getElementById(`progress-${index}`);
      step.classList.remove('active', 'completed');

      if (index < this.currentSectionIndex) {
        step.classList.add('completed');
      } else if (index === this.currentSectionIndex) {
        step.classList.add('active');
      }
    });
  }

  renderCurrentSection() {
    const section = this.config.course.sections[this.currentSectionIndex];
    const container = document.getElementById('course-content');

    if (section.type === 'video') {
      container.innerHTML = this.renderVideo(section);
    } else if (section.type === 'quiz-categorization') {
      container.innerHTML = this.renderCategorizationQuiz(section);
      this.setupCategorizationQuiz(section);
    } else if (section.type === 'quiz-slider') {
      container.innerHTML = this.renderSliderQuiz(section);
      this.setupSliderQuiz(section);
    }

    this.updateProgress();
  }

  renderVideo(section) {
    const videoContent = section.youtube_id
      ? `<iframe src="https://www.youtube.com/embed/${section.youtube_id}" allowfullscreen></iframe>`
      : `<div class="video-placeholder">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
           <span>${section.placeholder_text}</span>
         </div>`;

    return `
      <div class="step active">
        <div class="video-container">
          ${videoContent}
        </div>
        <div class="section-label">${section.label}</div>
        <div class="section-title">${section.title}</div>
        <div class="section-desc">${section.description}</div>
        <div class="btn-row">
          <button class="btn btn-primary" onclick="courseApp.nextSection()">${section.button_text}</button>
        </div>
      </div>
    `;
  }

  renderCategorizationQuiz(section) {
    this.currentQuestionIndex = 0;
    this.quizAnswers[section.id] = [];

    return `
      <div class="step active">
        <div class="section-label">${section.label}</div>
        <div class="section-title">${section.title}</div>
        <div class="section-instructions">${section.instructions}</div>
        <div class="quiz-counter" id="quiz-counter"></div>
        <div class="quiz-question" id="quiz-question"></div>
        <div class="mc-options" id="mc-options"></div>
        <div class="feedback" id="feedback"></div>
        <div class="btn-row">
          <button class="btn btn-submit" id="submit-btn" onclick="courseApp.submitCategorizationAnswer()" disabled>Submit Answer</button>
          <button class="btn btn-primary" id="next-btn" style="display:none;" onclick="courseApp.nextCategorizationQuestion()">Next Question →</button>
        </div>
      </div>
    `;
  }

  renderSliderQuiz(section) {
    this.currentQuestionIndex = 0;
    this.quizAnswers[section.id] = [];

    return `
      <div class="step active">
        <div class="section-label">${section.label}</div>
        <div class="section-title">${section.title}</div>
        <div class="section-instructions">${section.instructions}</div>
        <div class="quiz-counter" id="quiz-counter"></div>
        <div class="quiz-question" id="quiz-question"></div>
        <p style="font-size:13px; color:#888; margin-bottom:8px; font-style:italic;">How framed or unframed is this message? Drag the slider to rate it.</p>
        <div class="slider-container">
          <div class="slider-labels">
            <span>${section.scale_labels.low}</span>
            <span>${section.scale_labels.high}</span>
          </div>
          <div class="slider-track">
            <input type="range" min="0" max="100" value="50" id="slider" oninput="courseApp.updateSliderValue(this.value)">
          </div>
          <div class="slider-value" id="slider-value">50</div>
          <div class="slider-hint">${section.hint}</div>
        </div>
        <div class="feedback" id="feedback"></div>
        <div class="btn-row">
          <button class="btn btn-submit" id="submit-btn" onclick="courseApp.submitSliderAnswer()">Submit Rating</button>
          <button class="btn btn-primary" id="next-btn" style="display:none;" onclick="courseApp.nextSliderQuestion()">Next Question →</button>
        </div>
      </div>
    `;
  }

  setupCategorizationQuiz(section) {
    this.renderCategorizationQuestion(section);
  }

  renderCategorizationQuestion(section) {
    const question = section.questions[this.currentQuestionIndex];
    const total = section.questions.length;

    document.getElementById('quiz-counter').textContent = `Question ${this.currentQuestionIndex + 1} of ${total}`;
    document.getElementById('quiz-question').textContent = question.statement;

    const optionsContainer = document.getElementById('mc-options');
    optionsContainer.innerHTML = '';

    section.options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'mc-option';
      button.textContent = option;
      button.dataset.answer = option;
      button.onclick = () => this.selectCategorizationAnswer(option);
      optionsContainer.appendChild(button);
    });

    document.getElementById('submit-btn').disabled = true;
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').className = 'feedback';
  }

  selectCategorizationAnswer(answer) {
    const buttons = document.querySelectorAll('.mc-option');
    buttons.forEach(btn => btn.classList.remove('selected'));

    const selectedButton = Array.from(buttons).find(btn => btn.dataset.answer === answer);
    selectedButton.classList.add('selected');

    this.selectedAnswer = answer;
    document.getElementById('submit-btn').disabled = false;
  }

  submitCategorizationAnswer() {
    const section = this.config.course.sections[this.currentSectionIndex];
    const question = section.questions[this.currentQuestionIndex];
    const isCorrect = this.selectedAnswer === question.correct;

    this.quizAnswers[section.id].push({
      questionId: question.id,
      selected: this.selectedAnswer,
      correct: question.correct,
      isCorrect: isCorrect
    });

    const buttons = document.querySelectorAll('.mc-option');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === question.correct) {
        btn.classList.add('correct');
      } else if (btn.dataset.answer === this.selectedAnswer && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    const feedback = document.getElementById('feedback');
    const feedbackText = question.feedback[this.selectedAnswer];

    if (isCorrect) {
      feedback.className = 'feedback show correct';
      feedback.innerHTML = feedbackText;
    } else {
      feedback.className = 'feedback show incorrect';
      feedback.innerHTML = feedbackText;
    }

    document.getElementById('submit-btn').style.display = 'none';

    if (this.currentQuestionIndex < section.questions.length - 1) {
      document.getElementById('next-btn').textContent = 'Next Question →';
      document.getElementById('next-btn').style.display = 'inline-block';
    } else {
      document.getElementById('next-btn').textContent = this.getNextButtonText();
      document.getElementById('next-btn').style.display = 'inline-block';
    }
  }

  nextCategorizationQuestion() {
    const section = this.config.course.sections[this.currentSectionIndex];

    if (this.currentQuestionIndex < section.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderCategorizationQuestion(section);
    } else {
      this.nextSection();
    }
  }

  setupSliderQuiz(section) {
    this.renderSliderQuestion(section);
  }

  renderSliderQuestion(section) {
    const question = section.questions[this.currentQuestionIndex];
    const total = section.questions.length;

    document.getElementById('quiz-counter').textContent = `Question ${this.currentQuestionIndex + 1} of ${total}`;
    document.getElementById('quiz-question').textContent = question.statement;

    const slider = document.getElementById('slider');
    slider.value = 50;
    slider.disabled = false;
    document.getElementById('slider-value').textContent = '50';

    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').className = 'feedback';
  }

  updateSliderValue(value) {
    document.getElementById('slider-value').textContent = value;
  }

  getTierFromValue(value, tiers) {
    if (value >= tiers.non_framed.min && value < tiers.non_framed.max) {
      return 'non_framed';
    } else if (value >= tiers.mid.min && value < tiers.mid.max) {
      return 'mid';
    } else {
      return 'framed';
    }
  }

  submitSliderAnswer() {
    const section = this.config.course.sections[this.currentSectionIndex];
    const question = section.questions[this.currentQuestionIndex];
    const sliderValue = parseInt(document.getElementById('slider').value);
    const userTier = this.getTierFromValue(sliderValue, section.tiers);
    const isCorrect = userTier === question.correct_tier;

    this.quizAnswers[section.id].push({
      questionId: question.id,
      value: sliderValue,
      tier: userTier,
      correctTier: question.correct_tier,
      isCorrect: isCorrect
    });

    document.getElementById('slider').disabled = true;

    const feedback = document.getElementById('feedback');
    const feedbackText = question.feedback[userTier];

    if (isCorrect) {
      feedback.className = 'feedback show correct';
    } else {
      feedback.className = 'feedback show neutral';
    }
    feedback.innerHTML = feedbackText;

    document.getElementById('submit-btn').style.display = 'none';

    if (this.currentQuestionIndex < section.questions.length - 1) {
      document.getElementById('next-btn').textContent = 'Next Question →';
      document.getElementById('next-btn').style.display = 'inline-block';
    } else {
      document.getElementById('next-btn').textContent = this.getNextButtonText();
      document.getElementById('next-btn').style.display = 'inline-block';
    }
  }

  nextSliderQuestion() {
    const section = this.config.course.sections[this.currentSectionIndex];

    if (this.currentQuestionIndex < section.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderSliderQuestion(section);
    } else {
      this.nextSection();
    }
  }

  getNextButtonText() {
    const nextSection = this.config.course.sections[this.currentSectionIndex + 1];
    if (!nextSection) {
      return 'Continue →';
    }

    if (nextSection.type === 'video') {
      return `Continue to ${nextSection.label} →`;
    }
    return 'Continue →';
  }

  nextSection() {
    if (this.currentSectionIndex < this.config.course.sections.length - 1) {
      this.currentSectionIndex++;
      this.renderCurrentSection();
    } else {
      this.showCompletion();
    }
  }

  showCompletion() {
    const container = document.getElementById('course-content');
    container.innerHTML = '';

    const completion = document.getElementById('completion');
    const config = this.config.course.completion;

    const score = this.calculateScore();

    completion.innerHTML = `
      <div class="completion-icon">${config.icon}</div>
      <h2>${config.title}</h2>
      <p>${config.description}</p>
      <div class="score-badge">${score.text}</div>
    `;

    completion.classList.add('show');

    // Mark all progress as completed
    this.config.course.sections.forEach((_, index) => {
      const step = document.getElementById(`progress-${index}`);
      step.classList.remove('active');
      step.classList.add('completed');
    });
  }

  calculateScore() {
    let totalCorrect = 0;
    let totalQuestions = 0;

    Object.keys(this.quizAnswers).forEach(quizId => {
      const answers = this.quizAnswers[quizId];
      answers.forEach(answer => {
        totalQuestions++;
        if (answer.isCorrect) {
          totalCorrect++;
        }
      });
    });

    const percentage = Math.round((totalCorrect / totalQuestions) * 100);
    return {
      correct: totalCorrect,
      total: totalQuestions,
      percentage: percentage,
      text: `Score: ${totalCorrect}/${totalQuestions} questions answered correctly (${percentage}%)`
    };
  }
}

// Initialize the app when DOM is ready
let courseApp;
document.addEventListener('DOMContentLoaded', () => {
  courseApp = new CourseApp();
});
