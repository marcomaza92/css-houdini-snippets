// eslint-disable-next-line no-undef
export default mondrianWorklet = () =>
  registerPaint(
    "mondrian",
    class {
      static get inputProperties() {
        return ["--cell-count", "--border-width"];
      }

      paint(ctx, size, properties) {
        const cellCount =
          parseInt(properties.get("--cell-count").toString()) || 5;
        const borderWidth =
          parseInt(properties.get("--border-width").toString()) || 2;

        const colors = ["red", "blue", "yellow", "white", "white", "white"];
        const blackColorChance = 0.1;

        const totalWidth = size.width - borderWidth * (cellCount + 1);
        const totalHeight = size.height - borderWidth * (cellCount + 1);

        const cellWidth = totalWidth / cellCount;
        const cellHeight = totalHeight / cellCount;

        const rectangles = [];

        for (let i = 0; i < cellCount; i++) {
          for (let j = 0; j < cellCount; j++) {
            const xOffset = i * (cellWidth + borderWidth) + borderWidth;
            const yOffset = j * (cellHeight + borderWidth) + borderWidth;

            rectangles.push({
              x: xOffset,
              y: yOffset,
              width: cellWidth,
              height: cellHeight,
            });

            if (i + 1 < cellCount) {
              rectangles.push({
                x: xOffset,
                y: yOffset,
                width: cellWidth * 2,
                height: cellHeight,
              });
            }

            if (i + 2 < cellCount) {
              rectangles.push({
                x: xOffset,
                y: yOffset,
                width: cellWidth * 3,
                height: cellHeight,
              });
            }
          }
        }

        rectangles.sort(() => Math.random() - 0.5);

        for (const rect of rectangles) {
          const randomColor = Math.random();
          const color =
            randomColor < blackColorChance
              ? "black"
              : colors[Math.floor(Math.random() * colors.length)];

          ctx.fillStyle = color;
          ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

          ctx.strokeStyle = "black";
          ctx.lineWidth = borderWidth;
          ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
      }
    }
  );
