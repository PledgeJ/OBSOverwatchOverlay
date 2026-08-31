using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Win32;


namespace Overlay
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private int team1Score = 0;
        private int team2Score = 0;

        public MainWindow()
        {
            InitializeComponent();
        }

        // Updates the name h1 tags for each team
        private void TeamName_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                var textBox = (TextBox)sender;

                if (textBox == Team1NameInput)
                {
                    App._webSocket.Update("name-team1", Team1NameInput.Text);
                }
                else if (textBox == Team2NameInput)
                {
                    App._webSocket.Update("name-team2", Team2NameInput.Text);
                }
            }
        }

        // Adds 1 to the score of the team
        private void TeamScore_add(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreAdd)
            {
                team1Score++;
                App._webSocket.Update("score-team1", team1Score.ToString());
            }
            else if (button == Team2ScoreAdd)
            {
                team2Score++;
                App._webSocket.Update("score-team2", team2Score.ToString());
            }
            UpdateScoreDisplay();
        }

        // Subs 1 to the score of the team
        private void TeamScore_sub(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreSub && team1Score >= 0)
            {
                team1Score--;
                App._webSocket.Update("score-team1", team1Score.ToString());
            }
            else if (button == Team2ScoreSub && team2Score >= 0)
            {
                team2Score--;
                App._webSocket.Update("score-team2", team2Score.ToString());
            }
            UpdateScoreDisplay();
        }

        // Sets team score to 0
        private void TeamScore_zero(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            if (button == Team1ScoreZero && team1Score != 0)
            {
                team1Score = 0;
                App._webSocket.Update("score-team1", "0");
            }
            else if (button == Team2ScoreZero && team2Score != 0)
            {
                team2Score = 0;
                App._webSocket.Update("score-team2", "0");
            }
            UpdateScoreDisplay();
        }

        private void UpdateScoreDisplay()
        {
            Team1Score.Text = team1Score.ToString();
            Team2Score.Text = team2Score.ToString();
        }

        private void SelectImage(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;

            OpenFileDialog dialog = new OpenFileDialog
            {
                Title = "Select an image",
                Filter = "Image files (*.png;*.jpg;*.jpeg)|*.png;*.jpg;*.jpeg|All files (*.*)|*.*",
                Multiselect = false
            };

            bool? res = dialog.ShowDialog();

            if (res == true)
            {
                string filePath = dialog.FileName;

                string target;
                TextBox textBox;

                if (button == Team1SelectImage)
                {
                    target = "img-team1";
                    textBox = Team1ImagePath;
                }
                else if (button == Team2SelectImage)
                {
                    target = "img-team2";
                    textBox = Team2ImagePath;
                }
                else
                {
                    return;
                }

                string url = $"image?path={Uri.EscapeDataString(filePath)}";
                App._webSocket.Update(target, url);
                textBox.Text = filePath;
            }
        }
    }
}