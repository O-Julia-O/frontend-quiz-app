function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    document.getElementById("progressFill").style.width = `${percent}%`;
}