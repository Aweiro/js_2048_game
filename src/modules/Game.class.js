'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    console.log(initialState);
    this.gameField = document.querySelector('.game-field>tbody');
  }

  moveLeft() {
    this.move('left');
  }
  moveRight() {
    this.move('right');
  }
  moveUp() {
    this.move('top');
  }
  moveDown() {
    this.move('bottom');
  }

  /**
   * @returns {number}
   */
  getScore() {}

  /**
   * @returns {number[][]}
   */
  getState() {}

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    this.newCell();
    this.newCell();
  }

  /**
   * Resets the game.
   */
  restart() {
    const allFieldCell = document.querySelectorAll('.active');

    for (const key of allFieldCell) {
      key.classList = 'field-cell';
      key.textContent = '';
    }

    this.start();
  }

  // Add your own methods here
  newCell() {
    const gameField = document.querySelector('.game-field');
    let attempts = 0;
    let placed = false;

    while (!placed && attempts < 10) {
      const randomRow = Math.floor(Math.random() * 4);
      const randomCell = Math.floor(Math.random() * 4);
      const randomFieldCell = Math.floor(Math.random() * 2) * 2 + 2;
      const currentFieldCell = gameField.rows[randomRow].cells[randomCell];

      // If the cell is empty, place the new cell
      if (!currentFieldCell.matches('.active')) {
        currentFieldCell.classList.add(
          `field-cell--${randomFieldCell}`,
          'active',
        );
        currentFieldCell.textContent = `${randomFieldCell}`;
        placed = true;
      }
      attempts++;
    }
  }

  move(direction) {
    const gameField = this.gameField;
    const fieldCells = [...document.querySelectorAll('.active')];
    const activeFieldsArr = [];

    // переробити
    for (const key of fieldCells) {
      [...gameField.rows].map((element) => {
        if ([...element.cells].indexOf(key) !== -1) {
          activeFieldsArr.push([
            [...gameField.rows].indexOf(element),
            [...element.cells].indexOf(key),
          ]);
        }
      });
    }

    for (const activeCell of activeFieldsArr) {
      const activeRow = activeCell[0];
      const activeColumn = activeCell[1];
      const currentActive = gameField.rows[activeRow].cells[activeColumn];
      const copyCurrentActive = currentActive.cloneNode(true);

      currentActive.classList = 'field-cell';
      currentActive.textContent = '';

      const currentActiveRow = gameField.rows[activeRow];

      if (direction === 'right') {
        if (!currentActiveRow.cells[3].matches('.active')) {
          currentActiveRow.cells[3].replaceWith(copyCurrentActive);
        } else if (!currentActiveRow.cells[2].matches('.active')) {
          currentActiveRow.cells[2].replaceWith(copyCurrentActive);
        } else if (!currentActiveRow.cells[1].matches('.active')) {
          currentActiveRow.cells[1].replaceWith(copyCurrentActive);
        } else {
          currentActiveRow.cells[0].replaceWith(copyCurrentActive);
        }
      }

      if (direction === 'left') {
        if (!currentActiveRow.cells[0].matches('.active')) {
          currentActiveRow.cells[0].replaceWith(copyCurrentActive);
        } else if (!currentActiveRow.cells[1].matches('.active')) {
          currentActiveRow.cells[1].replaceWith(copyCurrentActive);
        } else if (!currentActiveRow.cells[2].matches('.active')) {
          currentActiveRow.cells[2].replaceWith(copyCurrentActive);
        } else {
          currentActiveRow.cells[3].replaceWith(copyCurrentActive);
        }
      }

      if (direction === 'top') {
        if (!gameField.rows[0].cells[activeColumn].matches('.active')) {
          gameField.rows[0].cells[activeColumn].replaceWith(copyCurrentActive);
        } else if (!gameField.rows[1].cells[activeColumn].matches('.active')) {
          gameField.rows[1].cells[activeColumn].replaceWith(copyCurrentActive);
        } else if (!gameField.rows[2].cells[activeColumn].matches('.active')) {
          gameField.rows[2].cells[activeColumn].replaceWith(copyCurrentActive);
        } else {
          gameField.rows[3].cells[activeColumn].replaceWith(copyCurrentActive);
        }
      }

      if (direction === 'bottom') {
        // переробити
        if (!gameField.rows[3].cells[activeColumn].matches('.active')) {
          gameField.rows[3].cells[activeColumn].replaceWith(copyCurrentActive);
        } else if (!gameField.rows[2].cells[activeColumn].matches('.active')) {
          gameField.rows[2].cells[activeColumn].replaceWith(copyCurrentActive);
        } else if (!gameField.rows[1].cells[activeColumn].matches('.active')) {
          gameField.rows[1].cells[activeColumn].replaceWith(copyCurrentActive);
        } else {
          gameField.rows[0].cells[activeColumn].replaceWith(copyCurrentActive);
        }
      }
    }

    const newFieldCells = [...document.querySelectorAll('.active')];
    const newActiveFieldsArr = [];

    // переробити
    for (const key of newFieldCells) {
      [...gameField.rows].map((element) => {
        if ([...element.cells].indexOf(key) !== -1) {
          newActiveFieldsArr.push([
            [...gameField.rows].indexOf(element),
            [...element.cells].indexOf(key),
          ]);
        }
      });
    }

    for (const activeCell of newActiveFieldsArr) {
      const activeRow = activeCell[0];
      const activeColumn = activeCell[1];

      const currentActiveRow = gameField.rows[activeRow];

      if (direction === 'right') {
        if (
          currentActiveRow.cells[1].textContent ===
            currentActiveRow.cells[0].textContent &&
          currentActiveRow.cells[0].textContent !== ''
        ) {
          currentActiveRow.cells[1].classList.remove(
            `field-cell--${currentActiveRow.cells[1].textContent}`,
          );

          currentActiveRow.cells[1].textContent =
            currentActiveRow.cells[1].textContent * 2;

          currentActiveRow.cells[1].classList.add(
            `field-cell--${currentActiveRow.cells[1].textContent}`,
          );

          currentActiveRow.cells[0].textContent = '';
          currentActiveRow.cells[0].classList = 'field-cell';
        }

        if (
          currentActiveRow.cells[2].textContent ===
            currentActiveRow.cells[1].textContent &&
          currentActiveRow.cells[1].textContent !== ''
        ) {
          currentActiveRow.cells[2].classList.remove(
            `field-cell--${currentActiveRow.cells[2].textContent}`,
          );

          currentActiveRow.cells[2].textContent =
            currentActiveRow.cells[2].textContent * 2;

          currentActiveRow.cells[2].classList.add(
            `field-cell--${currentActiveRow.cells[2].textContent}`,
          );

          currentActiveRow.cells[1].textContent = '';
          currentActiveRow.cells[1].classList = 'field-cell';
        }

        if (
          currentActiveRow.cells[3].textContent ===
            currentActiveRow.cells[2].textContent &&
          currentActiveRow.cells[2].textContent !== ''
        ) {
          currentActiveRow.cells[3].classList.remove(
            `field-cell--${currentActiveRow.cells[3].textContent}`,
          );

          currentActiveRow.cells[3].textContent =
            currentActiveRow.cells[3].textContent * 2;

          currentActiveRow.cells[3].classList.add(
            `field-cell--${currentActiveRow.cells[3].textContent}`,
          );

          currentActiveRow.cells[2].textContent = '';
          currentActiveRow.cells[2].classList = 'field-cell';
        }
      }

      if (direction === 'left') {
        if (
          currentActiveRow.cells[0].textContent ===
            currentActiveRow.cells[1].textContent &&
          currentActiveRow.cells[1].textContent !== ''
        ) {
          currentActiveRow.cells[0].classList.remove(
            `field-cell--${currentActiveRow.cells[0].textContent}`,
          );

          currentActiveRow.cells[0].textContent =
            currentActiveRow.cells[0].textContent * 2;

          currentActiveRow.cells[0].classList.add(
            `field-cell--${currentActiveRow.cells[0].textContent}`,
          );

          currentActiveRow.cells[1].textContent = '';
          currentActiveRow.cells[1].classList = 'field-cell';
        }

        if (
          currentActiveRow.cells[1].textContent ===
            currentActiveRow.cells[2].textContent &&
          currentActiveRow.cells[2].textContent !== ''
        ) {
          currentActiveRow.cells[1].classList.remove(
            `field-cell--${currentActiveRow.cells[1].textContent}`,
          );

          currentActiveRow.cells[1].textContent =
            currentActiveRow.cells[1].textContent * 2;

          currentActiveRow.cells[1].classList.add(
            `field-cell--${currentActiveRow.cells[1].textContent}`,
          );

          currentActiveRow.cells[2].textContent = '';
          currentActiveRow.cells[2].classList = 'field-cell';
        }

        if (
          currentActiveRow.cells[2].textContent ===
            currentActiveRow.cells[3].textContent &&
          currentActiveRow.cells[3].textContent !== ''
        ) {
          currentActiveRow.cells[2].classList.remove(
            `field-cell--${currentActiveRow.cells[2].textContent}`,
          );

          currentActiveRow.cells[2].textContent =
            currentActiveRow.cells[2].textContent * 2;

          currentActiveRow.cells[2].classList.add(
            `field-cell--${currentActiveRow.cells[2].textContent}`,
          );

          currentActiveRow.cells[3].textContent = '';
          currentActiveRow.cells[3].classList = 'field-cell';
        }
      }

      if (direction === 'top') {
        if (
          gameField.rows[0].cells[activeColumn].textContent ===
            gameField.rows[1].cells[activeColumn].textContent &&
          gameField.rows[1].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[0].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[0].cells[activeColumn].textContent}`,
          );

          gameField.rows[0].cells[activeColumn].textContent =
            gameField.rows[0].cells[activeColumn].textContent * 2;

          gameField.rows[0].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[0].cells[activeColumn].textContent}`,
          );

          gameField.rows[1].cells[activeColumn].textContent = '';
          gameField.rows[1].cells[activeColumn].classList = 'field-cell';
        }

        if (
          gameField.rows[1].cells[activeColumn].textContent ===
            gameField.rows[2].cells[activeColumn].textContent &&
          gameField.rows[2].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[1].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[1].cells[activeColumn].textContent}`,
          );

          gameField.rows[1].cells[activeColumn].textContent =
            gameField.rows[1].cells[activeColumn].textContent * 2;

          gameField.rows[1].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[1].cells[activeColumn].textContent}`,
          );

          gameField.rows[2].cells[activeColumn].textContent = '';
          gameField.rows[2].cells[activeColumn].classList = 'field-cell';
        }

        if (
          gameField.rows[2].cells[activeColumn].textContent ===
            gameField.rows[3].cells[activeColumn].textContent &&
          gameField.rows[3].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[2].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[2].cells[activeColumn].textContent}`,
          );

          gameField.rows[2].cells[activeColumn].textContent =
            gameField.rows[2].cells[activeColumn].textContent * 2;

          gameField.rows[2].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[2].cells[activeColumn].textContent}`,
          );

          gameField.rows[3].cells[activeColumn].textContent = '';
          gameField.rows[3].cells[activeColumn].classList = 'field-cell';
        }
      }

      if (direction === 'bottom') {
        if (
          gameField.rows[1].cells[activeColumn].textContent ===
            gameField.rows[0].cells[activeColumn].textContent &&
          gameField.rows[0].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[1].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[1].cells[activeColumn].textContent}`,
          );

          gameField.rows[1].cells[activeColumn].textContent =
            gameField.rows[1].cells[activeColumn].textContent * 2;

          gameField.rows[1].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[1].cells[activeColumn].textContent}`,
          );

          gameField.rows[0].cells[activeColumn].textContent = '';
          gameField.rows[0].cells[activeColumn].classList = 'field-cell';
        }

        if (
          gameField.rows[2].cells[activeColumn].textContent ===
            gameField.rows[1].cells[activeColumn].textContent &&
          gameField.rows[1].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[2].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[2].cells[activeColumn].textContent}`,
          );

          gameField.rows[2].cells[activeColumn].textContent =
            gameField.rows[2].cells[activeColumn].textContent * 2;

          gameField.rows[2].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[2].cells[activeColumn].textContent}`,
          );

          gameField.rows[1].cells[activeColumn].textContent = '';
          gameField.rows[1].cells[activeColumn].classList = 'field-cell';
        }

        if (
          gameField.rows[3].cells[activeColumn].textContent ===
            gameField.rows[2].cells[activeColumn].textContent &&
          gameField.rows[2].cells[activeColumn].textContent !== ''
        ) {
          gameField.rows[3].cells[activeColumn].classList.remove(
            `field-cell--${gameField.rows[3].cells[activeColumn].textContent}`,
          );

          gameField.rows[3].cells[activeColumn].textContent =
            gameField.rows[3].cells[activeColumn].textContent * 2;

          gameField.rows[3].cells[activeColumn].classList.add(
            `field-cell--${gameField.rows[3].cells[activeColumn].textContent}`,
          );

          gameField.rows[2].cells[activeColumn].textContent = '';
          gameField.rows[2].cells[activeColumn].classList = 'field-cell';
        }
      }
    }

    let isMove = false;

    for (let i = 0; i < activeFieldsArr.length; i++) {
      if (newActiveFieldsArr[i].join('') !== activeFieldsArr[i].join('')) {
        isMove = true;
      }
    }

    if (isMove) {
      this.newCell();
    }
  }
}

module.exports = Game;
